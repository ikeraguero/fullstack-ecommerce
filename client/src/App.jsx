import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { FormProvider } from "./hooks/useFormContext";
import Nav from "./components/Nav/Nav";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ManageProduct from "./pages/ManageProduct/ManageProduct";
import useCategories from "./api/categories.api";
import Cart from "./pages/Cart/Cart";
import useCart from "./api/cart.api";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  const userId = useSelector((state) => state.auth.id);
  const queryClient = new QueryClient();
  const { data: categories } = useCategories();
  console.log(userId === undefined ? 0 : userId);
  const {
    data: cart,
    error,
    refetch,
    isLoading,
  } = useCart(userId === undefined ? 0 : userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <FormProvider>
        <BrowserRouter>
          <Nav categories={categories} />
          <Routes>
            <Route
              index
              element={<Home userId={userId} refetch={refetch} cart={cart} />}
            />
            <Route path="/*" element={<PageNotFound />} />
            <Route
              path="/cart"
              element={<Cart cart={cart} refetch={refetch} />}
            />
            <Route
              path="/products/:id"
              element={
                <Product cart={cart} userId={userId} refetch={refetch} />
              }
            />
            <Route
              path="/addproduct"
              element={<ManageProduct categories={categories} />}
            />
            <Route path="/login" element={<Login refetchCart={refetch} />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </FormProvider>
    </QueryClientProvider>
  );
}

export default App;
