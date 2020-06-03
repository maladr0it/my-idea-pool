import React from "react";
import { Switch, Route } from "react-router-dom";

import { SignUpScreen } from "./SignUpScreen";
import { SignInScreen } from "./SignInScreen";
import { HomeScreen } from "./HomeScreen";

export const App = () => {
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
