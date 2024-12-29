import styles from "./ProductCard.module.css";

function ProductCard({
  name,
  price,
  image_data,
  image_type,
}) {
  return (
    <div className={styles.productCard}>
      <div className={styles.productCardImage}>
        <img src={`data:${image_type};base64,${image_data}`} alt={name} />
      </div>
      <div className={styles.productCardBody}>
        <span className={styles.productName}>{name}</span>
        <span className={styles.productPrice}>${price}</span>
      </div>
    </div>
  );
}

export default ProductCard;
