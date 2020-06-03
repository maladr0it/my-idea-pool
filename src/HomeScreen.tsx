import React from "react";
import { Redirect } from "react-router-dom";

import { useAuth } from "./AuthContext";

export const HomeScreen = () => {
  const auth = useAuth();

  if (!auth.user) {
    return <Redirect to="/signup" />;
  }

  return (
    <>
      <header>
        <h1>Home Screen</h1>
        <button onClick={auth.signOut}>Sign out</button>
      </header>
      <main>{auth.user && <p>Welcome, {auth.user.name}</p>}</main>
    </>
  );
};
