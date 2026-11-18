"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { authService } from "@/features/auth/services/auth-service";
import type { AuthUser } from "@/features/auth/types";

type AuthContextValue = {
  /** Null until a preview sign-in happens in this tab. */
  user: AuthUser | null;
  login: typeof authService.login;
  register: typeof authService.register;
  forgotPassword: typeof authService.forgotPassword;
  resetPassword: typeof authService.resetPassword;
  verifyEmail: typeof authService.verifyEmail;
  resendVerification: typeof authService.resendVerification;
  completeOnboarding: typeof authService.completeOnboarding;
  logout: typeof authService.logout;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getServerUser() {
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const user = useSyncExternalStore(
    authService.subscribe,
    authService.getCurrentUser,
    getServerUser,
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: authService.login,
      register: authService.register,
      forgotPassword: authService.forgotPassword,
      resetPassword: authService.resetPassword,
      verifyEmail: authService.verifyEmail,
      resendVerification: authService.resendVerification,
      completeOnboarding: authService.completeOnboarding,
      logout: authService.logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
