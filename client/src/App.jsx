import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { ProductFormProvider } from "./hooks/useProductsFormContext";
import Nav from "./components/Nav/Nav";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import SearchResults from "./pages/SearchResults/SearchResults";
import ManageProduct from "./pages/ManageProduct/ManageProduct";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import useCategories from "./api/categories.api";
import Cart from "./pages/Cart/Cart";
import useCart from "./api/cart.api";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SuccessAlert from "./components/SuccessAlert/SuccessAlert";
import { useState } from "react";
import { Spinner } from "@nextui-org/react";

function App() {
  const userId = useSelector((state) => state.auth.id);
  const [searchProducts, setSearchProducts] = useState([]);

  const { data: categories } = useCategories();
  const {
    data: cart,
    error,
    refetch,
    isLoading,
  } = useCart(userId === undefined ? 0 : userId);
  const [successOpen, setSuccessOpen] = useState(false);

  const openSuccess = () => {
    setSuccessOpen(true);
    setTimeout(() => {
      setSuccessOpen(false);
    }, 4000);
  };

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <ProductFormProvider>
      <BrowserRouter>
        <SuccessAlert
          successOpen={successOpen}
          setOpen={setSuccessOpen}
          message={"Product added to cart successfully"}
        />
        <Nav categories={categories} setSearchProducts={setSearchProducts} />
        <Routes>
          <Route
            index
            element={
              <Home
                userId={userId}
                refetch={refetch}
                cart={cart}
                successOpen={successOpen}
                openSuccess={openSuccess}
                setSuccessOpen={setSuccessOpen}
              />
            }
          />
          <Route path="/*" element={<PageNotFound />} />
          <Route
            path="/cart"
            element={<Cart cart={cart} refetch={refetch} />}
          />
          <Route
            path="/products/:id"
            element={
              <Product
                cart={cart}
                userId={userId}
                refetch={refetch}
                openSuccess={openSuccess}
              />
            }
          />
          <Route
            path="/dashboard"
            element={<ManageProduct categories={categories} />}
          />
          <Route
            path="/search"
            element={<SearchResults searchProducts={searchProducts} />}
          />
          <Route path="categories/:name" element={<CategoryPage />} />
          <Route path="/login" element={<Login refetchCart={refetch} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ProductFormProvider>
  );
}

export default App;
