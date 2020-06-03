import React from "react";
import { Redirect } from "react-router-dom";

import { useAuth } from "./AuthContext";

export const HomeScreen = () => {
  const auth = useAuth();

  if (auth.status === "signed_out") {
    return <Redirect to="/signup" />;
  }

  if (auth.status === "restoring_session") {
    return <main>Loading...</main>;
  }

  return (
    <>
      <header>
        <h1>Home Screen</h1>
        <button onClick={auth.signOut}>Sign out</button>
      </header>
      <main>{auth.user && <p>Welcome, {auth.user?.name}</p>}</main>
    </>
  );
};
