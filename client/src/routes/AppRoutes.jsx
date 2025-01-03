import { Route, Routes } from "react-router-dom";

import Home from "../pages/home/Home";
import Product from "../features/products/pages/Product";
import PageNotFound from "../pages/pagenotfound/PageNotFound";
import SearchResults from "../pages/searchresults/SearchResults";

import CategoryPage from "../pages/categorypage/CategoryPage";
import Cart from "../features/cart/pages/Cart";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import PaymentSuccess from "../pages/paymentsuccess/PaymentSuccess";
import Checkout from "../pages/checkout/Checkout";
import Profile from "../features/users/pages/Profile";
import Dashboard from "../features/dashboard/pages/Dashboard";
import PaymentError from "../pages/paymenterror/PaymentError";
import Unauthorized from "../pages/unauthorized/Unauthorized";

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
