import styles from "./ProductItem.module.css";

function ProductItem({ dispatch, product, removeProduct }) {
  function handleDelete(productId) {
    removeProduct(productId);
  }

  function handleEdit() {
    dispatch({ type: "openEdit", payload: product });
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
          onClick={() => handleDelete(product.id)}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
        <button className={styles.editButton} onClick={() => handleEdit()}>
          <ion-icon name="pencil-outline"></ion-icon>
        </button>
      </div>
    </li>
  );
}

export default ProductItem;
