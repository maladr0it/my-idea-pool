import React from "react";
import { Switch, Route } from "react-router-dom";

import { SignUpScreen } from "./SignUpScreen";
import { SignInScreen } from "./SignInScreen";
import { HomeScreen } from "./HomeScreen";
import { useAuth } from "./AuthContext";

export const App = () => {
  const auth = useAuth();

  if (!auth.initialized) {
    return <main>...</main>;
  }

  return (
    <>
      <Switch>
        <Route path="/signup">
          <SignUpScreen />
        </Route>
        <Route path="/signin">
          <SignInScreen />
        </Route>
        <Route path="/">
          <HomeScreen />
        </Route>
      </Switch>
    </>
  );
};
