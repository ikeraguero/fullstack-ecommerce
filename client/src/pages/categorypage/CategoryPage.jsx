import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useProductsByCategory } from "@api/products/products.api";
import styles from "./CategoryPage.module.css";
import ProductCard from "@features/products/components/ProductCard/ProductCard";
import LoadingState from "@features/shared/components/LoadingState/LoadingState";
import ErrorState from "@features/shared/components/ErrorState/ErrorState";

function CategoryPage({ activeCategory }) {
  const {
    data: categoryProducts,
    isLoading,
    refetch,
    error,
  } = useProductsByCategory(activeCategory);

  useEffect(
    function () {
      refetch();
    },
    [activeCategory]
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} retry={refetch} />;
  }

  return (
    <div className={styles.mainContainer}>
      <h1>
        {`What's best on `}{" "}
        <span className={styles.activeCategory}>{activeCategory}</span>
      </h1>
      <div className={styles.productGrid}>
        {categoryProducts?.map((product) => (
          <Link
            to={`/products/${product.id}`}
            key={product.id}
            className={styles.categoryProductsLink}
          >
            <ProductCard key={product} {...product} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
