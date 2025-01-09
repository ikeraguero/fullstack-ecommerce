import ProductCard from "@features/products/components/ProductCard/ProductCard";
import styles from "./SearchResults.module.css";
import { Link } from "react-router-dom";

function SearchResults({ searchProducts }) {
  const resultsLength = searchProducts.length;
  const resultsMessage =
    resultsLength === 0
      ? "No results found"
      : `Results found (${resultsLength})`;

  if (resultsLength === 0) {
    return (
      <div className={styles.mainContainer}>
        <h1>{resultsMessage}</h1>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.mainContainer}>
        <h1>{resultsMessage}</h1>
        <div className={styles.productGrid}>
          {searchProducts?.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className={styles.productLink}
            >
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
