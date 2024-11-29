import Main from "../components/Main/Main";
import Nav from "../components/Nav/Nav";
import axios from "axios";
import styles from "./ManageProduct.module.css";
import ProductsList from "../components/ProductsList/ProductsList";
import { useEffect, useState } from "react";

function ManageProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function send(formData) {
    const productName = formData.get("productName");
    const productPrice = parseFloat(formData.get("productPrice"));
    const productStockQuantity = Number(formData.get("productStockQuantity"));

    const productData = {
      name: productName,
      price: productPrice,
      stock_quantity: productStockQuantity,
    };

    axios
      .post("http://localhost:8080/api/products", productData)
      .then((res) => setProducts(() => [...products, res.data]))
      .catch((error) => console.log(error));
  }

  function remove(productId) {
    /// TODO: Add confirmation for product deletion
    axios
      .delete(`http://localhost:8080/api/products/${productId}`)
      .catch((err) => console.log(err));
    setProducts(products.filter((product) => product.id !== productId));
  }

  return (
    <div>
      <Nav />
      <Main>
        <div className={styles.addProductContainer}>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              send(formData);
            }}
          >
            <div className={styles.formItem}>
              <label htmlFor="productName">Product Name</label>
              <input name="productName" className={styles.addFormInput} />
            </div>
            <div className={styles.formItem}>
              <label htmlFor="productPrice">Product Price</label>
              <input name="productPrice" className={styles.addFormInput} />
            </div>
            <div className={styles.formItem}>
              <label htmlFor="productStockQuantity">
                Product Stock Quantity
              </label>
              <input
                name="productStockQuantity"
                className={styles.addFormInput}
              />
            </div>
            <div className={styles.formItem}>
              <label htmlFor="productCategory">Product Category</label>
              <select
                name="productCategory"
                id="productCategory"
                className={styles.addFormInput}
              >
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
              </select>
            </div>
            <button type="submit" className={styles.sendButton}>
              +
            </button>
          </form>
          {products.length === 0 && (
            <div className={styles.emptyMessage}>
              There are no products registered!
            </div>
          )}
          <ProductsList products={products} removeProduct={remove} />
        </div>
      </Main>
    </div>
  );
}

export default ManageProduct;
