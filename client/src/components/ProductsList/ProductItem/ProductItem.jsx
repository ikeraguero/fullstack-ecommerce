import styles from "./ProductItem.module.css";

function ProductItem({ product, handleOpenForm, onRemove }) {
  function handleEdit() {
    handleOpenForm("openEdit", product);
  }

  return (
    <li className={styles.productLine}>
      <div className={styles.productName}>{product.name}</div>
      <div className={styles.productPrice}>R${product.price}</div>
      <div className={styles.productCategory}>{product.category_name}</div>
      <div className={styles.productStockQuantity}>
        {product.stock_quantity} units
      </div>
      <div className={styles.productItemButtons}>
        <button
          className={styles.removeButton}
          onClick={() => onRemove(product.id)}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
        <button className={styles.editButton} onClick={handleEdit}>
          <ion-icon name="pencil-outline"></ion-icon>
        </button>
      </div>
    </li>
  );
}

export default ProductItem;
