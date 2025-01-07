import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AlertProvider } from "../context/AlertContext";
import store from "../store/store";
import QueryDevtools from "../features/shared/components/QueryDevtools/QueryDevtools";
import { SuccessProvider } from "../context/SuccessContext";
import { CheckoutProvider } from "@context/CheckoutContext";

export const queryClient = new QueryClient();

// high order component

const AppProviders = ({ children }) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <CheckoutProvider>
        <SuccessProvider>
          <AlertProvider>
            <BrowserRouter>
              {children}
              <QueryDevtools />
            </BrowserRouter>
          </AlertProvider>
        </SuccessProvider>
      </CheckoutProvider>
    </QueryClientProvider>
  </Provider>
);

export default AppProviders;
