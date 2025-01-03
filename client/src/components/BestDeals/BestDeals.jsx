import { Link } from "react-router-dom";
import styles from "./BestDeals.module.css";
import ProductCard from "../ProductCard/ProductCard";
import { MoonLoader } from "react-spinners";
import { useProducts } from "../../api/products/products.api";

function BestDeals() {
  const { data: products, error, isLoading } = useProducts();

  if (isLoading) {
    return (
      <>
        <div className={styles.spinnerContainer}>
          <MoonLoader size={50} color="#000000" speedMultiplier={1} />
        </div>
      </>
    );
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }
  return (
    <section className={styles.bestDeals}>
      <div className={styles.bestDealsHeader}>
        <h2>
          Grab the best deals on{" "}
          <span className={styles.bestDealCategory}>Smartphones</span>
        </h2>
        <div className={styles.bestDealsViewAll}>
          <span>View All</span>
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </div>
      </div>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <Link
            to={`products/${product.id}`}
            key={product.id}
            className={styles.productLink}
          >
            <ProductCard {...product} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default BestDeals;
