import React from "react";
import { Switch, Route } from "react-router-dom";
import "styled-components/macro";

import { useAuth } from "./AuthContext";
import { PageNav } from "./components/PageNav";
import { SignUp, SignIn } from "./features/SignIn";
import { MyIdeas } from "./features/MyIdeas";

export const App = () => {
  const auth = useAuth();

  if (!auth.initialized) {
    return null;
  }

  return (
    <div
      css={`
        min-height: 100%;
        display: grid;
        grid-template-columns: auto 1fr;
      `}
    >
      <PageNav />
      <main>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/">
            <MyIdeas />
          </Route>
        </Switch>
      </main>
    </div>
  );
};
