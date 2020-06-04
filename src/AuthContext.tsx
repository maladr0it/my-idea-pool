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
  // const [initialized, setInitialized] = useState(true);
  // const [user, setUser] = useState<User | null>({
  //   name: "Joyce Lee",
  //   email: "TEST@TEST.COM",
  //   avatar_url:
  //     "https://gravatar.com/avatar/2758c1887d872fe344598d9175165504?s=200",
  // });
  // const [user, setUser] = useState(null);

  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleSignIn = (user: User) => setUser(user);
    const handleSignOut = () => setUser(null);

    auth.init(handleSignIn, handleSignOut);

    const restoreSession = async () => {
      await auth.restoreSession();
      setInitialized(true);
    };
    restoreSession();
  }, []);

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
