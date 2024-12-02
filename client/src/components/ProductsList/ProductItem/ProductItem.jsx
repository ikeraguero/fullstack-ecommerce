import { useEffect, useState } from "react";
import styles from "./ProductItem.module.css";
import axios from "axios";

function ProductItem({
  productName,
  productPrice,
  productStockQuantity,
  productCategory,
  productId,
  removeProduct,
}) {
  const [productCategoryName, setProductCategoryName] = useState("");

  const BASE_URL = "http://localhost:8080/api";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/categories/${productCategory}`)
      .then((res) => setProductCategoryName(res.data.name))
      .catch((err) => console.log(err));
  }, []);

  function handleDelete(productId) {
    removeProduct(productId);
  }

  /// make pop for edit

  return (
    <li className={styles.productLine}>
      <div className={styles.productName}>{productName}</div>
      <div className={styles.productPrice}>R${productPrice}</div>
      <div className={styles.productCategory}>{productCategoryName}</div>
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
