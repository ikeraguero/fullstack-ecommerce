import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { UserFormProvider } from "../hooks/useUsersFormContext";
import { CheckoutProvider } from "../context/CheckoutContext";
import { AlertProvider } from "../context/AlertContext";
import store from "../store/store";
import QueryDevtools from "../components/QueryDevtools/QueryDevtools";
import { CartProvider } from "../context/CartContext";

export const queryClient = new QueryClient();

// high order component

const AppProviders = ({ children }) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <CheckoutProvider>
          <CartProvider>
            <AuthProvider>
              <UserFormProvider>
                <BrowserRouter>
                  {children}
                  <QueryDevtools />
                </BrowserRouter>
              </UserFormProvider>
            </AuthProvider>
          </CartProvider>
        </CheckoutProvider>
      </AlertProvider>
    </QueryClientProvider>
  </Provider>
);

export default AppProviders;
