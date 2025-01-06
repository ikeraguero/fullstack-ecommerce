import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Nav from "./features/navigation/components/Nav/Nav";
import useCartData from "./hooks/cart/useCartData";
import useCategories from "./api/categories/categories.api";
import { AppRoutes } from "./routes/AppRoutes";
import { useAuthStatus } from "@api/auth/auth.api";
import { loginSuccess } from "./actions/authActions";
import LoadingState from "@features/shared/components/LoadingState/LoadingState";
import ErrorState from "@features/shared/components/ErrorState/ErrorState";
import Alerts from "@features/shared/components/Alerts/Alerts";
import useUserState from "@hooks/user/useUserState";

const MemoizedNav = React.memo(Nav);

function App() {
  const { isLoggedIn } = useUserState();
  const dispatch = useDispatch();
  const { data: userData, isLoadingUser, errorUser } = useAuthStatus();
  const AUTH_ROUTES = ["/login", "/register"];

  const [activeCategory, setActiveCategory] = useState(null);
  const [searchProducts, setSearchProducts] = useState([]);

  const { data: categories } = useCategories();
  const { cart, error, refetch, isLoading } = useCartData();

  const location = useLocation();
  const isAuthPage = AUTH_ROUTES.includes(location.pathname);

  useEffect(() => {
    if (userData && !isLoadingUser && !errorUser && !isLoggedIn) {
      const { firstName, lastName, role, id, email } = userData;
      const username = `${firstName} ${lastName}`;
      dispatch(loginSuccess(username, role, id, email, firstName, lastName));
    }
  }, [userData, dispatch, isLoadingUser, errorUser, isLoggedIn]); 
  
  function handleSearch(products) {
    setSearchProducts(products);
  }

  function handleCategoryChange(category) {
    setActiveCategory(category);
  }

  if (isLoading || isLoadingUser) {
    return <LoadingState />;
  }

  if (error || errorUser) {
    return <ErrorState error={error || errorUser} retry={refetch} />;
  }

  return (
    <>
      <Alerts />
      {!isAuthPage && (
        <MemoizedNav
          categories={categories}
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          activeCategory={activeCategory}
        />
      )}
      <AppRoutes
        cart={cart}
        onCategoryChange={setActiveCategory}
        refetch={refetch}
        categories={categories}
        searchProducts={searchProducts}
        activeCategory={activeCategory}
      />
    </>
  );
}

export default App;
