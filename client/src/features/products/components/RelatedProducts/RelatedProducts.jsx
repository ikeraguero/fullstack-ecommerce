import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./RelatedProducts.module.css";

function RelatedProducts({ products }) {
  console.log(products);
  return (
    <>
      <h2 className={styles.title}>Related items you may like: </h2>
      <ul className={styles.relatedProductsList}>
        {products?.map((product) => (
          <li key={product.id}>
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className={styles.relatedProductsLink}
            >
              <ProductCard key={product} {...product} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default RelatedProducts;
