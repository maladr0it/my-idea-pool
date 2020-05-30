import React, { createContext, useCallback } from "react";

import * as services from "./services";

interface AuthContextValue {
  authStatus: "signed_in" | "signed_out" | "signing_in" | "error";
  userData: services.User;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const getUser = useCallback;

  return <AuthContext.Provider value={}>{children}</AuthContext.Provider>;
};
