import React from "react";
import { render } from "react-dom";
import "materialize-css/dist/css/materialize.min.css";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import App from "./components/App.js";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
