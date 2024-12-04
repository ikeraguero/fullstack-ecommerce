import Main from "../../components/Main/Main";
import axios from "axios";
import styles from "./ManageProduct.module.css";
import ProductsList from "../../components/ProductsList/ProductsList";
import { useEffect, useRef, useReducer } from "react";

const BASE_URL = "http://localhost:8080/api";

const initialState = {
  products: [],
  image: {},
  isAdding: false,
  isEditing: false,
  editProduct: null,
  produtName: null,
  productPrice: null,
  productCategory: null,
  productQuantity: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loadProducts":
      return { ...state, products: action.payload };
    case "toggleAdd":
      return { ...state, isAdding: !state.isAdding };
    case "setImage":
      return { ...state, image: action.payload };
    case "openEdit":
      return {
        ...state,
        isEditing: true,
        editProduct: action.payload,
        productName: action.payload.name,
        productPrice: action.payload.price,
        productCategory: action.payload.category,
        productQuantity: action.payload.stock_quantity,
      };
    case "closeEdit":
      return {
        ...state,
        isEditing: false,
        editProduct: null,
        productName: null,
        productPrice: null,
        productCategory: null,
        productQuantity: null,
      };
    case "changeName":
      return { ...state, productName: action.payload };
    case "changePrice":
      return { ...state, productPrice: action.payload };
    case "changeCategory":
      return { ...state, productCategory: action.payload };
    case "changeQuantity":
      return { ...state, productQuantity: action.payload };
  }
}

function ManageProduct({ categories }) {
  const formRef = useRef();

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    products,
    image,
    isAdding,
    isEditing,
    editProduct,
    productName,
    productPrice,
    productCategory,
    productQuantity,
  } = state;

  useEffect(() => {
    fetchProducts();
  }, []);

  function fetchProducts() {
    axios
      .get(`${BASE_URL}/products`)
      .then((res) => {
        dispatch({ type: "loadProducts", payload: res.data });
      })
      .catch((err) => console.log(err));
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];
    dispatch({ type: "setImage", payload: file });
  }

  async function send(type, formData) {
    const productName = formData.get("productName");
    const productPrice = parseFloat(formData.get("productPrice"));
    const productStockQuantity = Number(formData.get("productStockQuantity"));
    const productCategory = Number(formData.get("productCategory"));
    let imageId = null;
    imageId = editProduct?.image_id;

    if (!isEditing || image) {
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
    }
    console.log(
      productName,
      productPrice,
      productStockQuantity,
      productCategory
    );

    if (
      !productName ||
      !productPrice ||
      !productStockQuantity ||
      !productCategory
    )
      return alert("Empty fields are not allowed");

    let productData = {
      name: productName,
      price: productPrice,
      stock_quantity: productStockQuantity,
      category_id: productCategory,
      image_id: isEditing && !image ? editProduct.image_id : imageId,
    };

    if (type === "post") {
      console.log(productData);
      axios
        .post(`${BASE_URL}/products`, productData)
        .then(
          (res) =>
            dispatch({
              type: "loadProducts",
              payload: [...products, res.data],
            }),
          formRef.current.reset()
        )
        .catch((error) => console.log(error));

      dispatch({ type: "toggleAdd" });
    }
    if (isEditing) {
      productData = { id: editProduct.id, ...productData };
      console.log(productData);
      axios
        .put(`${BASE_URL}/products`, productData)
        .then(
          (res) =>
            dispatch({
              type: "loadProducts",
              payload: [
                ...products.filter((product) => product.id != editProduct.id),
                res.data,
              ],
            }),
          formRef.current.reset()
        )
        .catch((error) => console.log(error));

      dispatch({ type: "closeEdit" });
    }
  }

  function remove(productId) {
    /// TODO: Add confirmation for product deletion
    axios
      .delete(`${BASE_URL}/products/${productId}`)
      .catch((err) => console.log(err));
    dispatch({
      type: "loadProducts",
      payload: products.filter((product) => product.id !== productId),
    });
  }

  // function update(productId, formData) {
  //  formData.append("id", productId);
  //  formData.forEach((value, key) => {
  //     console.log(`${key}: ${value}`);
  //   });
  //  axios
  //    .put(`${BASE_URL}/products`, formData)
  //    .then((res) => console.log(res.data))
  //   .catch((err) => console.log(err));
  // }

  return (
    <>
      <Main>
        {(isAdding || isEditing) && <div className={styles.overlay} />}

        <div className={styles.addProductContainer}>
          <span
            onClick={() => dispatch({ type: "toggleAdd" })}
            className={styles.openAddProductButton}
          >
            Add Product +
          </span>
          <div className={isAdding || isEditing ? styles.form : styles.hide}>
            <span>
              {!isEditing ? "Add New Product" : `Edit ${editProduct?.name}`}
            </span>
            <form
              ref={formRef}
              className={styles.formBody}
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                if (isEditing) {
                  send("put", formData);
                  return;
                }
                send("post", formData);
              }}
            >
              <div className={styles.formItem}>
                <label htmlFor="productName">Product Name</label>
                <input
                  onChange={(e) =>
                    dispatch({ type: "changeName", payload: e.target.value })
                  }
                  name="productName"
                  className={styles.addFormInput}
                  value={isEditing ? productName : null}
                />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="productPrice">Product Price</label>
                <input
                  onChange={(e) =>
                    dispatch({ type: "changePrice", payload: e.target.value })
                  }
                  name="productPrice"
                  className={styles.addFormInput}
                  value={isEditing ? productPrice : null}
                />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="productStockQuantity">
                  Product Stock Quantity
                </label>
                <input
                  onChange={(e) =>
                    dispatch({
                      type: "changeQuantity",
                      payload: e.target.value,
                    })
                  }
                  name="productStockQuantity"
                  value={isEditing ? productQuantity : null}
                  className={styles.addFormInput}
                />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="productCategory">Product Category</label>
                <select
                  onChange={(e) =>
                    dispatch({
                      type: "changeCategory",
                      payload: e.target.value,
                    })
                  }
                  name="productCategory"
                  id="productCategory"
                  value={isEditing ? productCategory : null}
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
                <label htmlFor="productDescription">Product Description</label>
                <input
                  name="productDescription"
                  className={styles.addFormInput}
                />
              </div>
              <div className={styles.formItem}>
                <label htmlFor="productImage">Product Image</label>
                <input type="file" onChange={handleImageChange} />
              </div>
              <button type="submit" className={styles.sendButton}>
                +
              </button>
            </form>
          </div>

          {products.length === 0 && (
            <div className={styles.emptyMessage}>
              There are no products registered!
            </div>
          )}
          <ProductsList
            products={products}
            dispatch={dispatch}
            removeProduct={remove}
            fetchProducts={fetchProducts}
          />
        </div>
      </Main>
    </>
  );
}

export default ManageProduct;
