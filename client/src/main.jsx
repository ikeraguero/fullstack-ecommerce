import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import store from "./store/store";
import { AuthProvider } from "./context/AuthContext";
import { UserFormProvider } from "./hooks/useUsersFormContext";
import { CheckoutProvider } from "./context/CheckoutContext";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CheckoutProvider>
        <AuthProvider>
          <UserFormProvider>
            <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                <App />
              </QueryClientProvider>
            </BrowserRouter>
          </UserFormProvider>
        </AuthProvider>
      </CheckoutProvider>
    </Provider>
  </React.StrictMode>
);
