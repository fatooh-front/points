import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { AuthActions, AuthState, AuthUser } from "./AuthTypes";

export const useAuth = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      token: null,
      message: null,
      user: {
        bearerToken: "",
        branchId: null,
        picture: null,
        callCenterId: null,
        email: "",
        fullName: "",
        mobile: "",
        notes: null,
        password: null,
        reports: "",
        role: "",
        systemId: null,
        userId: "",
        username: "",
      },
      setToken: (token: string) => set({ token }),
      setMessage: (message: string) => set({ message }),
      setUser: (user: AuthUser) => set({ user }),
      setLoginData: (data: AuthState) =>
        set({
          token: data?.token,
          message: data?.message,
          user: data?.user,
        }),
      logout: () => {
        set({
          token: null,
          message: null,
          user: {
            bearerToken: "",
            branchId: null,
            picture: null,
            callCenterId: null,
            email: "",
            fullName: "",
            mobile: "",
            notes: null,
            password: null,
            reports: "",
            role: "",
            systemId: null,
            userId: "",
            username: "",
          },
        });
        localStorage.removeItem("useAuthStorage");
      },
    }),
    {
      name: "useAuthStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
