import { Link } from "react-router-dom";
import styles from "./BestDeals.module.css";
import ProductCard from "@features/products/components/ProductCard/ProductCard";

function BestDeals({ products, message, onCategoryChange }) {
  const words = message.split(" ");
  const category = words[words.length - 1];
  const formattedMessage = words.slice(0, -1).join(" ");

  return (
    <section className={styles.bestDeals}>
      <div className={styles.bestDealsHeader}>
        <h2>
          {formattedMessage}
          <span className={styles.bestDealCategory}>
            {" "}
            {category.toUpperCase().slice(0, 1) +
              words[words.length - 1].slice(1)}
          </span>
        </h2>
        <div className={styles.bestDealsViewAll}>
          <Link
            className={styles.bestDealsViewAllLink}
            to={`categories/${category}`}
            onClick={() => onCategoryChange(category)}
          >
            <span>View All</span>
          </Link>
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </div>
      </div>
      <div className={styles.productGrid}>
        {products?.map((product) => (
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
