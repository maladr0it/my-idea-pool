import React, { createContext, useEffect } from "react";

import * as services from "./services";
import { useService } from "./useService";

type AuthStatus = "signed_in" | "signed_out" | "loading" | "bad_sign_in";

interface AuthContextValue {
  authStatus: AuthStatus;
  user: services.User | null;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const signIn = useService(services.signIn);
  const getUser = useService(services.getUser);
  const signOut = useService(services.signOut);

  // try to restore session
  useEffect(() => {
    getUser.call();
  }, [getUser.call]);

  const handleSignIn = async (username: string, password: string) => {
    await signIn.call(username, password);
    getUser.call();
  };

  const handleSignOut = async () => {
    await signOut.call();
    getUser.reset();
  };

  let authStatus: AuthStatus;
  if (signIn.status === "loading" || getUser.status === "loading") {
    authStatus = "loading";
  } else if (getUser.data) {
    authStatus = "signed_in";
  } else if (signIn.status === "error") {
    authStatus = "bad_sign_in";
  } else {
    authStatus = "signed_out";
  }

  return (
    <AuthContext.Provider
      value={{
        authStatus,
        user: getUser.data,
        signOut: handleSignOut,
        signIn: handleSignIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
