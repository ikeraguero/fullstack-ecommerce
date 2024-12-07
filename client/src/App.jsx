import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FormProvider } from "./hooks/useFormContext";
import Nav from "./components/Nav/Nav";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ManageProduct from "./pages/ManageProduct/ManageProduct";
import useCategories from "./api/categories.api";
import Cart from "./pages/Cart/Cart";
import useCart from "./api/cart.api";

function App() {
  const { data: categories } = useCategories();
  const userId = 1;
  const { data: cart, error, isLoading } = useCart(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <FormProvider>
      <BrowserRouter>
        <Nav categories={categories} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/cart" element={<Cart cart={cart} />} />
          <Route
            path="products/:id"
            element={<Product cart={cart} userId={userId} />}
          />
          <Route
            path="/addproduct"
            element={<ManageProduct categories={categories} />}
          />
        </Routes>
      </BrowserRouter>
    </FormProvider>
  );
}

export default App;
