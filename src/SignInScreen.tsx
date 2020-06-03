import React from "react";
import { Redirect, Link } from "react-router-dom";

import { useAuth } from "./AuthContext";

export const SignInScreen = () => {
  const auth = useAuth();

  const signIn = () =>
    auth.signIn("jack-black_001@codementor.io", "the-Secret-123");

  const badSignIn = () =>
    auth.signIn("jack-black_001@codementor.io", "the-Secret-1234");

  if (auth.status === "signed_in" || auth.status === "restoring_session") {
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
        {auth.status === "signing_in" && <p>Signing in...</p>}
        {auth.status === "bad_sign_in" && (
          <p>Either email or password is incorrect</p>
        )}
      </main>
    </>
  );
};
