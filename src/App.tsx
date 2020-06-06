import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "styled-components/macro";

import { useAuth } from "./AuthContext";
import { PageNav } from "./components/PageNav";
import { SignUp, SignIn } from "./features/SignIn";

const MyIdeas = React.lazy(() => import("./features/MyIdeas"));

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
        <Suspense fallback={null}>
          <Switch>
            <Route path="/signup">
              {!auth.user ? <SignUp /> : <Redirect to="/" />}
            </Route>
            <Route path="/signin">
              {!auth.user ? <SignIn /> : <Redirect to="/" />}
            </Route>
            <Route path="/">
              {auth.user ? <MyIdeas /> : <Redirect to="/signup" />}
            </Route>
          </Switch>
        </Suspense>
      </main>
    </div>
  );
};
