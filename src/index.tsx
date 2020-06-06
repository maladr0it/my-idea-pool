import React from "react";
import ReactDOM from "react-dom";
// to allow the 'css' prop
import * as _ from "styled-components/cssprop";
import { createGlobalStyle } from "styled-components";

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./AuthContext";

import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import "./reset.css";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary: rgba(0,168,67,1);
    --onPrimary: #fff;
    --neutral: rgba(42,56,66,0.2);
    --background: #fff;
    --onBackground: #2A3842;
    --warning: tomato;

    --fontWeight-normal: 300;
    --fontWeight-bold: 400;
  }
  *, *::before, *::after {
    box-sizing: inherit;
  }
  html {
    height: 100%;
  }
  body {
    height: 100%;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-weight: var(--fontWeight-normal);
    line-height: 1.2;
    color: var(--onBackground);
  }
  #root {
    height: 100%;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <GlobalStyle />
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
