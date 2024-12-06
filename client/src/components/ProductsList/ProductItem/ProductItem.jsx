import { useEffect, useState } from "react";
import styles from "./ProductItem.module.css";
import axios from "axios";

function ProductItem({ dispatch, product, refetch, removeProduct }) {
  const [categoryName, setCategoryName] = useState("");

  const BASE_URL = "http://localhost:8080/api";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/categories/${product.category_id}`)
      .then((res) => setCategoryName(res.data.name))
      .catch((err) => console.log(err));
  }, [product.category_id]);

  function handleDelete(productId) {
    removeProduct(productId);
  }

  function handleEdit() {
    dispatch({ type: "openEdit", payload: product });
  }

  /// make pop for edit

  return (
    <li className={styles.productLine}>
      <div className={styles.productName}>{product.name}</div>
      <div className={styles.productPrice}>R${product.price}</div>
      <div className={styles.productCategory}>{categoryName}</div>
      <div className={styles.productStockQuantity}>
        {product.stock_quantity}
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
