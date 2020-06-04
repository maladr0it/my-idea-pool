import React from "react";
import { Switch, Route } from "react-router-dom";

import { useAuth } from "./AuthContext";
import { Page } from "./components/Page";
import { SignUp, SignIn } from "./features/SignIn";
import { IdeasList } from "./features/IdeasList";

export const App = () => {
  const auth = useAuth();

  return (
    <Page>
      {auth.initialized ? (
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/">
            <IdeasList />
          </Route>
        </Switch>
      ) : (
        <div>Loading...</div>
      )}
    </Page>
  );
};
