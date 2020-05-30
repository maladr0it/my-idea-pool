import React, { useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as services from "./services";
import { useService } from "./useService";

const App = () => {
  // const signIn = async () => {
  //   // await services.signIn("jack-black_001@codementor.io", "the-Secret-123");
  //   await services.signIn("jack-black_001@codementor.io", "the-Secret-1234");
  //   console.log("success!");
  // };

  // const getUserFn = async () => {
  //   const user = await services.getUser();
  //   console.log(user);
  // };

  const getUser = useCallback(services.getUser, []);
  const userReq = useService(getUser);
  // const [userLoadState, userData, clearUserData] = useService(getUser);

  return (
    <Router>
      {/* // show login page if user cannot be retrieved */}
      <main>
        <h1>My Idea Pool</h1>
        <Switch>
          <Route path="/login">
            <p>Login screen</p>
          </Route>
          <Route path="/">
            <p>Logged in!</p>
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

// else show homescreen

// <div>
//   {userRequest.status === "idle" && userRequest.data === null && }
//   <button onClick={signIn}>SIGN IN</button>
//   <button onClick={getUserFn}>GET USER</button>
// </div>

export default App;
