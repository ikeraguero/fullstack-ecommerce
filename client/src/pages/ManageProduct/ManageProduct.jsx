import Main from "../../components/Main/Main";
import axios from "axios";
import styles from "./ManageProduct.module.css";
import ProductsList from "../../components/ProductsList/ProductsList";
import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8080/api";

function ManageProduct({ categories }) {
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    axios
      .get(`${BASE_URL}/products`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
  }

  async function send(formData) {
    const productName = formData.get("productName");
    const productPrice = parseFloat(formData.get("productPrice"));
    const productStockQuantity = Number(formData.get("productStockQuantity"));
    const productCategory = Number(formData.get("productCategory"));
    let imageId = null;

    const formDt = new FormData();
    formDt.append("image", image);

    try {
      const response = await axios.post(`${BASE_URL}/images/upload`, formDt, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Image uploaded successfully:", response.data);
      imageId = response.data.id;
    } catch (err) {
      console.log(err);
    }

    if (
      !productName ||
      !productPrice ||
      !productStockQuantity ||
      !productCategory
    )
      return alert("Empty fields are not allowed");

    const productData = {
      name: productName,
      price: productPrice,
      stock_quantity: productStockQuantity,
      category_id: productCategory,
      image_id: imageId,
    };
    console.log(productData);

    axios
      .post(`${BASE_URL}/products`, productData)
      .then((res) => setProducts(() => [...products, res.data]))
      .catch((error) => console.log(error));
  }

  function remove(productId) {
    /// TODO: Add confirmation for product deletion
    axios
      .delete(`${BASE_URL}/products/${productId}`)
      .catch((err) => console.log(err));
    setProducts(products.filter((product) => product.id !== productId));
  }

  return (
    <>
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
                className={styles.addFormSelect}
              >
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name[0].toUpperCase() + category.name.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.formItem}>
              <label htmlFor="productImage">Product Image</label>
              <input type="file" onChange={handleImageChange} />
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
          <ProductsList
            products={products}
            removeProduct={remove}
            fetchProducts={fetchProducts}
          />
        </div>
      </Main>
    </>
  );
}

export default ManageProduct;
