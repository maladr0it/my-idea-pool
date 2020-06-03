import React, { createContext, useEffect, useContext, useState } from "react";

import * as auth from "./services/auth";
import { User } from "./services/types";

interface AuthContextValue {
  initialized: boolean;
  user: User | null;
  signUp: typeof auth.signUp;
  signIn: typeof auth.signIn;
  signOut: typeof auth.signOut;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.init(
      (user) => {
        console.log("signed in");

        setUser(user);
      },
      () => {
        console.log("signed out");

        setUser(null);
      },
    );

    const restoreSession = async () => {
      await auth.restoreSession();
      setInitialized(true);
    };
    restoreSession();
  }, []);

  console.log(user);

  return (
    <AuthContext.Provider
      value={{
        initialized,
        user,
        signUp: auth.signUp,
        signIn: auth.signIn,
        signOut: auth.signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (value === undefined) {
    throw new Error("useAuth must be used inside a descendent of AuthContext");
  }
  return value;
};
