import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { User } from "./types";

interface AuthState {
  user: User | null;
  //   isAuthenticated: boolean;
  //   loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools((set) => ({
    user: null,
    setUser: (user: User | null) => set({ user: user }),
    logout: () => set({ user: null }),
  }))
);
