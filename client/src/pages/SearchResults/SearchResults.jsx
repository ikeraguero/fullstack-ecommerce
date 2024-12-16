import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./SearchResults.module.css";

function SearchResults({ searchProducts }) {
  const resultsLength = searchProducts.length;
  return (
    <div>
      <div className={styles.mainContainer}>
        {resultsLength === 0 && <h1>No results found</h1>}
        {resultsLength > 0 && (
          <h1>
            {resultsLength} {resultsLength === 1 ? "result" : "results"} found!
          </h1>
        )}
        <div className={styles.productGrid}>
          {searchProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
