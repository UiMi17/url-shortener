import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import App from "./App";
import { Provider } from "./components/ui/provider";
import { Theme } from "@chakra-ui/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <StrictMode>
    <Provider>
      <Theme appearance="light">
      <App />
      </Theme>
    </Provider>
  </StrictMode>
);
