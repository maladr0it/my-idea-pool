import React from "react";
import { Redirect, Link } from "react-router-dom";

import { useAuth } from "./AuthContext";

export const SignInScreen = () => {
  const auth = useAuth();

  const signIn = () =>
    auth.signIn("jack-black_001@codementor.io", "the-Secret-123");

  const badSignIn = () =>
    auth.signIn("jack-black_001@codementor.io", "the-Secret-1234");

  if (auth.user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <header>
        <h1>Sign In</h1>
      </header>
      <main>
        <button onClick={signIn}>Sign In</button>
        <button onClick={badSignIn}>Bad Sign In</button>
        <p>
          Don't have an account?<Link to="/signup">Sign up</Link>
        </p>
      </main>
    </>
  );
};
