import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import DataProvider from "./redux/store";

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
