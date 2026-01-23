import type { AiBuddy, Conversation } from "@/types/models";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = secureLocalStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  register: (email: string, password: string, name: string) =>
    api.post("/auth/register", { email, password, name }),
  me: () => api.get("/user/me"),
};

export const buddyApi = {
  getAll: () => api.get<AiBuddy[]>("/buddies"),
  getBySlug: (slug: string) => api.get(`/buddies/${slug}`),
  getByCategory: (category: string) => api.get(`/buddies/category/${category}`),
};

export const chatApi = {
  sendMessage: (conversationId: string, message: string, forceTier?: string) =>
    api.post("/chat/message", { conversationId, message, forceTier }),
  createConversation: (buddyId: string) =>
    api.post("/chat/conversation/new", { buddyId }),
  getConversations: () => api.get<Conversation[]>("/chat/conversations"),
  // Conversation
};

export const billingApi = {
  createCheckout: (tier: string) => api.post("/billing/checkout", { tier }),
};
