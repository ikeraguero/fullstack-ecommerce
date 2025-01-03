import { useLocation } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import React, { useCallback, useState } from "react";

import ErrorAlert from "./features/shared/components/ErrorAlert/ErrorAlert";
import Nav from "./features/navigation/components/Nav/Nav";
import SuccessAlert from "./features/shared/components/SuccessAlert/SuccessAlert";
import ErrorBoundary from "./features/shared/components/ErrorBoundary/ErrorBoudary";
import { ProductFormProvider } from "./hooks/products/useProductsFormContext";
import useUserId from "./hooks/user/useUserId";
import useCartData from "./hooks/cart/useCartData";
import useCategories from "./api/categories/categories.api";
import { useAlert } from "./context/AlertContext";
import { useSuccess } from "./context/SuccessContext";
import { AppRoutes } from "./routes/AppRoutes";

const MemoizedNav = React.memo(Nav);

function App() {
  const userId = useUserId();
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchProducts, setSearchProducts] = useState([]);

  const { data: categories } = useCategories();

  const { cart, error, refetch, isLoading } = useCartData(userId ?? null);
  const { isErrorOpen, setErrorOpen, errorMessage } = useAlert();
  const { isSuccessOpen, setSuccessOpen, successMessage } = useSuccess();

  const handleSearch = useCallback(
    (products) => setSearchProducts(products),
    []
  );
  const handleCategoryChange = useCallback(
    (category) => setActiveCategory(category),
    []
  );

  const location = useLocation();
  const isAuthPage = ["/login", "/register"].includes(location.pathname);

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <ErrorBoundary error={error} retry={refetch} />;
  }

  return (
    <ProductFormProvider>
      <SuccessAlert
        successOpen={isSuccessOpen}
        setOpen={setSuccessOpen}
        message={successMessage}
        aria-live="assertive"
      />
      <ErrorAlert
        isErrorOpen={isErrorOpen}
        setOpen={setErrorOpen}
        message={errorMessage}
        aria-live="assertive"
      />
      {!isAuthPage && (
        <MemoizedNav
          categories={categories}
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
          activeCategory={activeCategory}
        />
      )}
      <AppRoutes
        userId={userId}
        cart={cart}
        refetch={refetch}
        categories={categories}
        searchProducts={searchProducts}
        activeCategory={activeCategory}
      />
    </ProductFormProvider>
  );
}

export default App;
