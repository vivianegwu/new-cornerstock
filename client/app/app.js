/**
 *
 * app.js
 *
 */

import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Router } from "react-router-dom";

import store, { history } from "./store";
import { SET_AUTH } from "./containers/Authentication/constants";
import Application from "./containers/Application";
import ScrollToTop from "./scrollToTop";
import setToken from "./utils/token";
import "./styles/style.scss";

// // Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";

// // Import Simple Line Icons Set
// import 'simple-line-icons/css/simple-line-icons.css';

// // react-bootstrap-table2 styles
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

// Authentication
const token = localStorage.getItem("token");

if (token) {
  // authenticate api authorization
  setToken(token);

  // authenticate routes
  store.dispatch({ type: SET_AUTH });
}

const app = () => (
  <Router history={history}>
    <Provider store={store}>
      <ScrollToTop>
        <Application />
      </ScrollToTop>
    </Provider>
  </Router>
);

export default app;
