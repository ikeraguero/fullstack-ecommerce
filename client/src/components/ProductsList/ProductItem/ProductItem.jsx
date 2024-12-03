import { useEffect, useState } from "react";
import styles from "./ProductItem.module.css";
import axios from "axios";

function ProductItem({
  productName,
  productPrice,
  productStockQuantity,
  productCategory,
  productImageId,
  productId,
  fetchProducts,
  removeProduct,
}) {
  const [categoryName, setCategoryName] = useState("");
  const [name, setName] = useState(productName);
  const [price, setPrice] = useState(productPrice);
  const [category, setCategory] = useState(productCategory);
  const [stockQuantity, setStockQuantity] = useState(productStockQuantity);
  const [isEditing, setIsEditing] = useState(false);

  const BASE_URL = "http://localhost:8080/api";

  useEffect(() => {
    axios
      .get(`${BASE_URL}/categories/${productCategory}`)
      .then((res) => setCategoryName(res.data.name))
      .catch((err) => console.log(err));
  }, [productCategory]);

  function handleDelete(productId) {
    removeProduct(productId);
  }

  function handleEdit(productId) {
    setIsEditing(true);
  }

  async function handleUpdate(productId) {
    let formData = new FormData();
    formData = {
      id: productId,
      name,
      price,
      category_id: category,
      stock_quantity: stockQuantity,
      image_id: productImageId,
    };
    console.log(formData);
    await axios
      .put("http://localhost:8080/api/products", formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setIsEditing(false);
    fetchProducts();
  }

  /// make pop for edit

  return (
    <li className={styles.productLine}>
      {!isEditing && (
        <>
          <div className={styles.productName}>{productName}</div>
          <div className={styles.productPrice}>R${productPrice}</div>
          <div className={styles.productCategory}>{categoryName}</div>
          <div className={styles.productStockQuantity}>
            {productStockQuantity}
          </div>
        </>
      )}
      {isEditing && (
        <>
          <input
            type="text"
            value={name}
            className={styles.editInputForm}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={styles.editInputForm}
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={styles.editInputForm}
          />
          <input
            type="text"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            className={styles.editInputForm}
          />
        </>
      )}
      <div className={styles.productItemButtons}>
        <button
          className={styles.removeButton}
          onClick={() => handleDelete(productId)}
        >
          <ion-icon name="trash-outline"></ion-icon>
        </button>
        {isEditing && (
          <button
            className={styles.editButton}
            onClick={() => handleUpdate(productId)}
          >
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </button>
        )}
        {!isEditing && (
          <button
            className={styles.editButton}
            onClick={() => handleEdit(productId)}
          >
            <ion-icon name="pencil-outline"></ion-icon>
          </button>
        )}
      </div>
    </li>
  );
}

export default ProductItem;
