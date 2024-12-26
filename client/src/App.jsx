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
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import CheckoutShipping from "./pages/CheckoutShipping/CheckoutShipping";
import Profile from "./pages/Profile/Profile";
import ErrorAlert from "./components/ErrorAlert/ErrorAlert";

function App() {
  const userId = useSelector((state) => state.auth.id);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchProducts, setSearchProducts] = useState([]);

  const { data: categories } = useCategories();
  const {
    data: cart,
    error,
    refetch,
    isLoading,
  } = useCart(userId === undefined ? 0 : userId);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [isErrorOpen, setErrorOpen] = useState(false);

  const openSuccess = () => {
    setSuccessOpen(true);
    setTimeout(() => {
      setSuccessOpen(false);
    }, 4000);
  };

  const openError = () => {
    setErrorOpen(true);
    setTimeout(() => {
      setErrorOpen(false);
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
          successOpen={isSuccessOpen}
          setOpen={setSuccessOpen}
          message={"Product added to cart successfully"}
        />
        <ErrorAlert
          isErrorOpen={isErrorOpen}
          setOpen={setErrorOpen}
          message={"Your cart is currently empty"}
        />
        <Nav
          categories={categories}
          setSearchProducts={setSearchProducts}
          setActiveCategory={setActiveCategory}
          activeCategory={activeCategory}
        />
        <Routes>
          <Route
            index
            element={<Home userId={userId} refetch={refetch} cart={cart} />}
          />
          <Route path="/*" element={<PageNotFound />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cart.cartItems}
                cartId={cart.id}
                refetch={refetch}
                errorOpen={isErrorOpen}
                openError={openError}
                setErrorOpen={setErrorOpen}
              />
            }
          />
          <Route
            path="/products/:id"
            element={
              <Product
                cartItems={cart.cartItems}
                cartId={cart.id}
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
          <Route path="profile" element={<Profile />} />
          <Route
            path="categories/:name"
            element={<CategoryPage activeCategory={activeCategory} />}
          />
          <Route path="/login" element={<Login refetchCart={refetch} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/payment/success/:id"
            element={<PaymentSuccess />}
          ></Route>
          <Route path="/checkout/:id/" element={<CheckoutShipping />} />
        </Routes>
      </BrowserRouter>
    </ProductFormProvider>
  );
}

export default App;
