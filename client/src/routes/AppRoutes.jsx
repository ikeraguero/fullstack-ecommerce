import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import Product from "../pages/Product/Product";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import SearchResults from "../pages/SearchResults/SearchResults";

import CategoryPage from "../pages/CategoryPage/CategoryPage";
import Cart from "../pages/Cart/Cart";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import Checkout from "../pages/Checkout/Checkout";
import Profile from "../pages/Profile/Profile";
import Dashboard from "../pages/Dashboard/Dashboard";
import PaymentError from "../pages/PaymentError/PaymentError";
import Unauthorized from "../pages/Unauthorized/Unauthorized";

export const AppRoutes = ({
  userId,
  cart,
  refetch,
  categories,
  searchProducts,
  activeCategory,
}) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<PageNotFound />} />
      <Route
        path="/cart"
        element={
          <Cart
            cartItems={cart?.cartItems}
            cartId={cart?.id}
            refetch={refetch}
          />
        }
      />
      <Route
        path="/products/:id"
        element={
          <Product
            cartItems={cart?.cartItems}
            cartId={cart?.id}
            userId={userId}
            refetch={refetch}
          />
        }
      />
      <Route
        path="/dashboard"
        element={<Dashboard categories={categories} requiredRole="ADMIN" />}
      />
      <Route
        path="/search"
        element={<SearchResults searchProducts={searchProducts} />}
      />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="categories/:name"
        element={<CategoryPage activeCategory={activeCategory} />}
      />
      <Route path="/login" element={<Login refetchCart={refetch} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/payment/success/:id" element={<PaymentSuccess />} />
      <Route path="/payment/error/:id" element={<PaymentError />} />
      <Route path="/checkout/:id/" element={<Checkout />} />
      <Route path="/unauthorized" element={<Unauthorized />}></Route>
    </Routes>
  );
};
