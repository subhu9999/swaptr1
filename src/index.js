import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./app/layout/App";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { configureStore } from "./app/store/configureStore";
import ScrollToTop from "./app/common/util/ScrollToTop";
import { loadListings } from "./features/listing/listingActions";
import ReduxToastr from "react-redux-toastr";

const store = configureStore();
store.dispatch(loadListings());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <ReduxToastr
          position="bottom-right"
          transitionIn="bounceIn"
          transitionOut="fadeOut"
        />
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
