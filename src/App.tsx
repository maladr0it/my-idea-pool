import React, { useCallback } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import * as services from "./services";
import { useService } from "./useService";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const testService = async (num: number) => {
  await delay(1000);
  return num * 2;
};

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

  // const getUser = useCallback(services.getUser, []);
  // const userReq = useService(getUser);

  const testReq = useService(testService);
  const signInReq = useService(services.signIn);
  console.log(signInReq);

  // const [userLoadState, userData, clearUserData] = useService(getUser);

  return (
    <Router>
      {/* // show login page if user cannot be retrieved */}
      <main>
        <button onClick={() => testReq.call(4)}>TEST</button>
        <button
          onClick={() =>
            signInReq.call("jack-black_001@codementor.io", "the-Secret-123")
          }
        >
          SIGN_IN
        </button>
        <h1>My Idea Pool</h1>
        {/* <Switch>
          <Route path="/login">
            <p>Login screen</p>
          </Route>
          <Route path="/">
            <p>Logged in!</p>
          </Route>
        </Switch> */}
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
