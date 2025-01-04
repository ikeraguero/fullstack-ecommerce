import styles from "./ProductCard.module.css";

function ProductCard({ name, price, imageData, imageType }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.productCardImage}>
        <img src={`data:${imageType};base64,${imageData}`} alt={name} />
      </div>
      <div className={styles.productCardBody}>
        <span className={styles.productName}>{name}</span>
        <span className={styles.productPrice}>${price}</span>
      </div>
    </div>
  );
}

export default ProductCard;
