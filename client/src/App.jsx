import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FormProvider } from "./hooks/useFormContext";
import Nav from "./components/Nav/Nav";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ManageProduct from "./pages/ManageProduct/ManageProduct";
import useCategories from "./api/categories.api";
import { useState } from "react";
import Cart from "./pages/Cart/Cart";

function App() {
  const { data: categories } = useCategories();
  const [cart, setCart] = useState([]);

  return (
    <FormProvider>
      <BrowserRouter>
        <Nav categories={categories} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />
          <Route
            path="products/:id"
            element={<Product setCart={setCart} cart={cart} />}
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
