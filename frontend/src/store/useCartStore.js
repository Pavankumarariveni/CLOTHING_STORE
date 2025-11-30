import { create } from "zustand";
import api from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useCartStore = create((set, get) => ({
  cart: [],
  totalPrice: 0,

  // Initialize: Load from API if logged in, else LocalStorage
  fetchCart: async () => {
    const { token } = useAuthStore.getState();

    if (token) {
      try {
        const { data } = await api.get("/cart");
        set({ cart: data.items || [] });
      } catch (error) {
        console.error("Failed to fetch cart", error);
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      set({ cart: localCart });
    }
  },

  addToCart: async (product, size, qty) => {
    const { token } = useAuthStore.getState();
    const { cart } = get();

    if (token) {
      // LOGGED IN: API Strategy
      try {
        await api.post("/cart", { productId: product._id, size, qty });
        get().fetchCart(); // Refresh from server
      } catch (error) {
        console.error("Add to cart error", error);
      }
    } else {
      // GUEST: LocalStorage Strategy
      const existingItemIndex = cart.findIndex(
        (item) => item.product._id === product._id && item.size === size
      );

      let updatedCart = [...cart];

      if (existingItemIndex > -1) {
        updatedCart[existingItemIndex].qty += qty;
      } else {
        updatedCart.push({
          product: product, // Store full product object for guest
          size,
          qty,
          _id: `${product._id}-${size}`, // Temp ID
        });
      }

      set({ cart: updatedCart });
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    }
  },

  removeFromCart: async (itemId) => {
    const { token } = useAuthStore.getState();

    if (token) {
      await api.delete(`/cart/${itemId}`);
      get().fetchCart();
    } else {
      const updatedCart = get().cart.filter((item) => item._id !== itemId);
      set({ cart: updatedCart });
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    }
  },

  updateQuantity: async (itemId, qty) => {
    const { token } = useAuthStore.getState();
    const { cart } = get();

    if (qty < 1) return; // Prevent going below 1 (use remove button for that)

    if (token) {
      // LOGGED IN: Call API
      try {
        const { data } = await api.put(`/cart/${itemId}`, { qty });
        // The API returns the full updated cart structure (with populated products)
        // depending on controller, but usually we just re-fetch to be safe
        // or if your controller returns the cart object:
        if (data.items) set({ cart: data.items });
        else get().fetchCart();
      } catch (error) {
        console.error("Failed to update qty", error);
      }
    } else {
      // GUEST: LocalStorage
      const updatedCart = cart.map((item) => {
        if (item._id === itemId) {
          return { ...item, qty: qty };
        }
        return item;
      });

      set({ cart: updatedCart });
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    }
  },
  // Crucial: Call this after Login to merge Guest cart to Server
  syncCart: async () => {
    const localCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    if (localCart.length === 0) return;

    // Send items one by one (or bulk if API supported it)
    for (const item of localCart) {
      await api.post("/cart", {
        productId: item.product._id,
        size: item.size,
        qty: item.qty,
      });
    }

    localStorage.removeItem("guestCart");
    get().fetchCart(); // Fetch final state from server
  },

  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem("guestCart");
  },
}));
