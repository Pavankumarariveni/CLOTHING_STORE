import { create } from "zustand";
import api from "../lib/axios";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false, // Used for Login Button spinner
  isChecking: true, // Used for initial app load (background)

  checkAuth: async () => {
    set({ isChecking: true });
    try {
      const { data } = await api.get("/users/profile");
      set({ user: data, isChecking: false });
    } catch (error) {
      set({ user: null, isChecking: false });
    }
  },

  login: async (email, password) => {
    set({ loading: true });
    try {
      const { data } = await api.post("/users/login", { email, password });
      set({ user: data, loading: false }); // State updates HERE
      return true;
    } catch (error) {
      set({ loading: false });
      return false;
    }
  },

  register: async (name, email, password) => {
    set({ loading: true });
    try {
      const { data } = await api.post("/users/register", {
        name,
        email,
        password,
      });
      set({ user: data, loading: false });
      return true;
    } catch (error) {
      set({ loading: false });
      return false;
    }
  },

  logout: async () => {
    try {
      await api.post("/users/logout");
      set({ user: null });
    } catch (error) {
      console.error(error);
    }
  },
}));
