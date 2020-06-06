import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from './state/store/configureStore';
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { StripeProvider } from 'react-stripe-elements'
import "./css/index.css";

if (process.env.NODE_ENV === "production") {
  axios.defaults.baseURL = process.env.REACT_APP_HEROKUURL;
} else if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = process.env.REACT_APP_LOCALURL;
}

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey="pk_test_21nBNjeqdyB1Mzm2VjDPQprF00kyEKYZSK">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StripeProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
