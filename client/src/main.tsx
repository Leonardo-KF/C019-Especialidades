import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-jtuw45s1.us.auth0.com"
      clientId="ZS6Xk6rRb2nRaLBiFWxGO0uJuHXFM79z"
      redirectUri={window.location.origin}
      audience="auth-service-financial-app"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
