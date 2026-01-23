import { create } from "zustand";
import { init } from "@instantdb/react";
import { authApi } from "@/lib/api";
import secureLocalStorage from "react-secure-storage";

// ID for app: aibuddie
const APP_ID = import.meta.env.VITE_INSTANT_APP_ID;
const db = init({ appId: APP_ID });

interface User {
  id: string;
  email: string;
  name: string;
  credits: number;
  subscriptionTier: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email, password) => {
    const { data } = await authApi.login(email, password);
    secureLocalStorage.setItem("token", data.token);
    db.auth.signInWithToken(data.token);
    set({ user: data.user, isAuthenticated: true });
  },
  register: async (email, password, name) => {
    const { data } = await authApi.register(email, password, name);
    secureLocalStorage.setItem("token", data.token);
    db.auth.signInWithToken(data.token);
    set({ user: data.user, isAuthenticated: true });
  },
  logout: () => {
    secureLocalStorage.removeItem("token");
    set({ user: null, isAuthenticated: false });
  },
  fetchUser: async () => {
    try {
      const { data } = await authApi.me();
      set({ user: data, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
