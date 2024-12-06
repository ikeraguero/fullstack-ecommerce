import styles from "./Product.module.css";
import { useParams } from "react-router-dom";
import { useProduct } from "../../api/products.api";

function Product() {
  const { id } = useParams();
  const { data: product, error, isLoading } = useProduct(id);

  const options = Array.from(
    { length: product?.stock_quantity },
    (_, i) => i + 1
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  console.log(product);
  return (
    <div className={styles.mainContainer}>
      <div className={styles.productPhoto}>
        <img
          src={`data:${product?.image_type};base64,${product?.image_data}`}
          alt={product?.name}
        />
      </div>
      <div className={styles.productDetails}>
        <div className={styles.productDetailsTop}>
          <h3 className={styles.productCategory}>{product.category}</h3>
          <h1>{product?.name}</h1>
          <h2>R${product?.price}</h2>
        </div>
        <span>Stock Available: {product?.stock_quantity}</span>
        <span>{product.product_description}</span>
        <select name="" id="" className={styles.select}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <div className={styles.interactive}>
          <div className={styles.interactiveQuantity}></div>
          <div className={styles.interactiveButtons}>
            <button className={styles.buttonAddToCart}>Add to Cart</button>
            <button className={styles.buttonBuy}>Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
