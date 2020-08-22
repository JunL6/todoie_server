import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

import thunk from "redux-thunk";
import reducer from "./reducers/index";
import { fetchUser } from "./actions";

import App from "./components/App";

// async function getAuthState() {
//   await fetchUser();
// }
// /*  why did we use these functions? */
// getAuthState().then(() => {

// });

ReactDOM.render(
  <Provider store={createStore(reducer, applyMiddleware(thunk))}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
