import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in Check Auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    console.log(data);
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });
      console.log(response);
      toast.success("Account created successfully.");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });
      console.log(response);
      toast.success("Account created successfully.");
    } catch (error) {
      console.error(error.response.data.message);
      toast.error("Something went wrong!");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      console.error(error.response.data.message);
      toast.error("Something went wrong!");
    }
  },
}));
