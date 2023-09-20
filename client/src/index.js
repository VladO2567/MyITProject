import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext.js";

import "./i18n.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Suspense fallback="...isLoading">
        <App />
      </Suspense>
    </AuthContextProvider>
  </React.StrictMode>
);
