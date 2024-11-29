import styles from "./ProductItem.module.css";

function ProductItem({
  productName,
  productPrice,
  productStockQuantity,
  productId,
  removeProduct,
}) {
  function handleDelete(productId) {
    removeProduct(productId);
  }

  return (
    <li className={styles.productLine}>
      <div className={styles.productName}>{productName}</div>
      <div className={styles.productPrice}>R${productPrice}</div>
      <div className={styles.productStockQuantity}>{productStockQuantity}</div>
      <div className={styles.productItemButtons}>
        <button
          className={styles.removeButton}
          onClick={() => handleDelete(productId)}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
        <button className={styles.editButton}>
          <ion-icon name="pencil-outline"></ion-icon>
        </button>
      </div>
    </li>
  );
}

export default ProductItem;
