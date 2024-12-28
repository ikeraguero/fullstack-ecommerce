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
import { AlertProvider } from "./context/AlertContext";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider>
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
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);
