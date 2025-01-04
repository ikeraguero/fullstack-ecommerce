import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { UserFormProvider } from "../hooks/user/useUsersFormContext";
import { AlertProvider } from "../context/AlertContext";
import store from "../store/store";
import QueryDevtools from "../features/shared/components/QueryDevtools/QueryDevtools";
import { SuccessProvider } from "../context/SuccessContext";

export const queryClient = new QueryClient();

// high order component

const AppProviders = ({ children }) => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <SuccessProvider>
        <AlertProvider>
          <UserFormProvider>
            <BrowserRouter>
              {children}
              <QueryDevtools />
            </BrowserRouter>
          </UserFormProvider>
        </AlertProvider>
      </SuccessProvider>
    </QueryClientProvider>
  </Provider>
);

export default AppProviders;
