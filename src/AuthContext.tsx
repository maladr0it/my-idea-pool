import React, { createContext, useEffect, useContext, useReducer } from "react";

import * as services from "./services";

interface AuthState {
  status:
    | "signed_in"
    | "signed_out"
    | "signing_up"
    | "bad_sign_up"
    | "signing_in"
    | "bad_sign_in"
    | "restoring_session";
  user: services.User | null;
}

type AuthAction =
  | {
      type: "sign_up_started";
    }
  | {
      type: "sign_up_succeeded";
      user: services.User;
    }
  | {
      type: "sign_up_failed";
    }
  | {
      type: "sign_in_started";
    }
  | {
      type: "sign_in_succeeded";
      user: services.User;
    }
  | {
      type: "sign_in_failed";
    }
  | {
      type: "sign_out_succeeded";
    }
  | {
      type: "session_restore_started";
    }
  | {
      type: "session_restore_succeeded";
      user: services.User;
    }
  | {
      type: "session_restore_failed";
    };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "sign_up_started": {
      return { ...state, status: "signing_up" };
    }
    case "sign_up_succeeded": {
      return { status: "signed_in", user: action.user };
    }
    case "sign_up_failed": {
      return { ...state, status: "bad_sign_up" };
    }
    case "sign_in_started": {
      return { ...state, status: "signing_in" };
    }
    case "sign_in_succeeded": {
      return { status: "signed_in", user: action.user };
    }
    case "sign_in_failed": {
      return { ...state, status: "bad_sign_in" };
    }
    case "sign_out_succeeded": {
      return { status: "signed_out", user: null };
    }
    case "session_restore_started": {
      return { ...state, status: "restoring_session" };
    }
    case "session_restore_succeeded": {
      return { status: "signed_in", user: action.user };
    }
    case "session_restore_failed": {
      return { ...state, status: "signed_out" };
    }
  }
};

interface AuthContextValue extends AuthState {
  signUp: (username: string, name: string, password: string) => void;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    status: "restoring_session",
    user: null,
  });

  const signUp = async (username: string, name: string, password: string) => {
    try {
      dispatch({ type: "sign_up_started" });
      await services.signUp(username, name, password);
      const user = await services.getUser();
      dispatch({ type: "sign_up_succeeded", user });
    } catch {
      dispatch({ type: "sign_up_failed" });
    }
  };

  const signIn = async (username: string, password: string) => {
    try {
      dispatch({ type: "sign_in_started" });
      await services.signIn(username, password);
      const user = await services.getUser();
      dispatch({ type: "sign_in_succeeded", user });
    } catch {
      dispatch({ type: "sign_in_failed" });
    }
  };

  const signOut = () => {
    services.signOut();
    dispatch({ type: "sign_out_succeeded" });
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        dispatch({ type: "session_restore_started" });
        const user = await services.getUser();
        dispatch({ type: "session_restore_succeeded", user });
      } catch {
        dispatch({ type: "session_restore_failed" });
      }
    };
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signUp, signIn, signOut }}>
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
