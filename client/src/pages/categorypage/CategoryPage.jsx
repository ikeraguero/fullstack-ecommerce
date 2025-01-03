import { useProductsByCategory } from "@api/products/products.api";
import { MoonLoader } from "react-spinners";
import styles from "./CategoryPage.module.css";
import ProductCard from "@features/products/components/ProductCard/ProductCard";
import { useEffect } from "react";

function CategoryPage({ activeCategory }) {
  const {
    data: categoryProducts,
    isLoading,
    refetch,
  } = useProductsByCategory(activeCategory);

  useEffect(
    function () {
      refetch();
    },
    [activeCategory]
  );

  if (isLoading) {
    return (
      <div>
        <div className={styles.spinnerContainer}>
          <MoonLoader size={50} color="#000000" speedMultiplier={1} />
        </div>
      </div>
    );
  }

  if (categoryProducts.length === 0) {
    return (
      <div className={styles.mainContainer}>
        <h1>No products available in this category.</h1>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <h1>
        {`What's best on `}{" "}
        <span className={styles.activeCategory}>{activeCategory}</span>
      </h1>
      <div className={styles.productGrid}>
        {categoryProducts.map((product) => (
          <ProductCard {...product} key={product.key} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
