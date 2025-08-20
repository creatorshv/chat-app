import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:3000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-auth");
      set({ authUser: res.data.message });
      get().connectSocket();
    } catch (error) {
      console.error("Error in check auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data.message });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      console.error("Error in signup: ", error);
      toast.error("Something went wrong!");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data.message });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      console.error("Error in login: ", error);
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
      get().disconnectSocket();
    } catch (error) {
      console.error("Error in logout: ", error);
      toast.error("Something went wrong!");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put("/auth/update-profile", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({ authUser: response.data.message });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    socket.connect();
    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
