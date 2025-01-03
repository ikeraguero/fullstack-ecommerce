import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { UserFormProvider } from "../hooks/user/useUsersFormContext";
import { CheckoutProvider } from "../context/CheckoutContext";
import { AlertProvider } from "../context/AlertContext";
import store from "../store/store";
import QueryDevtools from "../features/shared/components/QueryDevtools/QueryDevtools";
import { CartProvider } from "../context/CartContext";
import { SuccessProvider } from "../context/SuccessContext";

export const queryClient = new QueryClient();

// high order component

const AppProviders = ({ children }) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SuccessProvider>
          <AlertProvider>
            <CheckoutProvider>
              <CartProvider>
                <UserFormProvider>
                  <BrowserRouter>
                    {children}
                    <QueryDevtools />
                  </BrowserRouter>
                </UserFormProvider>
              </CartProvider>
            </CheckoutProvider>
          </AlertProvider>
        </SuccessProvider>
      </AuthProvider>
    </QueryClientProvider>
  </Provider>
);

export default AppProviders;
