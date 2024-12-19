import { useParams } from "react-router-dom";
import { useProductsByCategory } from "../../api/products.api";
import { MoonLoader } from "react-spinners";
import styles from "./CategoryPage.module.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";

function CategoryPage() {
  // todo: component has to rerender data when params are changed
  const params = useParams();
  const [categoryName, setCategoryName] = useState(params.name);
  const {
    data: categoryProducts,
    isLoading,
    refetch,
  } = useProductsByCategory(categoryName);

  useEffect(
    function () {
      setCategoryName(params.name);
    },
    [params]
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

  refetch();
  return (
    <div className={styles.mainContainer}>
      <div className={styles.productGrid}>
        {categoryProducts.map((product) => (
          <ProductCard {...product} key={product.key} />
        ))}
      </div>
    </div>
  );
}

export default CategoryPage;
