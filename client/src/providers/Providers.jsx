import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { UserFormProvider } from "../hooks/useUsersFormContext";
import { CheckoutProvider } from "../context/CheckoutContext";
import { AlertProvider } from "../context/AlertContext";
import store from "../store/store";
import QueryDevtools from "../components/QueryDevtools/QueryDevtools";

export const queryClient = new QueryClient();

// high order component

const AppProviders = ({ children }) => (
  <Provider store={store}>
    <AlertProvider>
      <CheckoutProvider>
        <AuthProvider>
          <UserFormProvider>
            <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                {children}
                <QueryDevtools />
              </QueryClientProvider>
            </BrowserRouter>
          </UserFormProvider>
        </AuthProvider>
      </CheckoutProvider>
    </AlertProvider>
  </Provider>
);

export default AppProviders;
