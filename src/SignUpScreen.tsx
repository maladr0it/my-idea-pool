import React from "react";
import { Redirect, Link } from "react-router-dom";

import { useAuth } from "./AuthContext";

export const SignUpScreen = () => {
  const auth = useAuth();

  const signUp = () => {
    auth.signUp(
      "jack-black_002@codementor.io",
      "Jack Black 2",
      "the-Secret-123",
    );
  };

  const badSignUp = () => {
    auth.signUp("jack-black@codementor.io", "Jack Black", "the-Secret-123");
  };

  if (auth.status === "signed_in" || auth.status === "restoring_session") {
    return <Redirect to="/" />;
  }

  return (
    <>
      <header>
        <h1>Sign up</h1>
      </header>
      <main>
        <button onClick={signUp}>Sign up</button>
        <button onClick={badSignUp}>Bad sign up</button>
        <p>
          Already have an account?<Link to="/signin">Sign in</Link>
        </p>
        {auth.status === "signing_up" && <p>Signing up...</p>}
        {auth.status === "bad_sign_up" && <p>Email has already been taken</p>}
      </main>
    </>
  );
};
