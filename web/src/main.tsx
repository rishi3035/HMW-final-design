import React from "react";
import ReactDOM from "react-dom/client";
import { RedesignedHmwPage } from "./RedesignedHmwPage";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RedesignedHmwPage />
    </React.StrictMode>
  );
}
