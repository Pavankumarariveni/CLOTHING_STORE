import { useState } from "react";
import api from "../lib/axios";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Calculate total safely
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare items for backend model: { name, qty, size, price, product: id }
    const orderItems = cart.map((item) => ({
      name: item.product.name,
      qty: item.qty,
      size: item.size,
      image: item.product.image,
      price: item.product.price,
      product: item.product._id,
    }));

    try {
      const res = await api.post("/orders", {
        items: orderItems,
        totalPrice: totalPrice,
      });
      clearCart();
      alert(`Order Placed! ID: ${res.data._id}`);
      navigate("/");
    } catch (error) {
      alert("Checkout Failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-8">Please log in to checkout.</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold tracking-tighter mb-8 uppercase">
        Checkout
      </h1>

      <form onSubmit={handleCheckout} className="space-y-6">
        <div>
          <label className="text-xs uppercase tracking-widest text-gray-500">
            Full Name
          </label>
          <input
            type="text"
            className="swiss-input"
            defaultValue={user.name}
            required
          />
        </div>
        <div>
          <label className="text-xs uppercase tracking-widest text-gray-500">
            Shipping Address
          </label>
          <input
            type="text"
            className="swiss-input"
            placeholder="123 Street Name, City"
            required
          />
        </div>

        <div className="pt-6 border-t mt-8">
          <div className="flex justify-between text-lg font-medium mb-6">
            <span>Total Amount</span>
            <span>₹ {totalPrice.toFixed(2)}</span>
          </div>
          <button type="submit" disabled={loading} className="swiss-btn">
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
