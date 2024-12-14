import { useEffect, useRef } from "react";
import axios from "axios";
import { useFormContext } from "../../hooks/useFormContext";
import { BASE_URL } from "../../config/config";
import useProducts, { createProduct } from "../../api/products.api";
import Main from "../../components/Main/Main";
import ProductsList from "../../components/ProductsList/ProductsList";
import ProductForm from "../../components/ProductForm/ProductForm";
import styles from "./ManageProduct.module.css";
import { useAuth } from "../../context/AuthContext";

function ManageProduct() {
  const { state, dispatch } = useFormContext();
  const { data: initialProducts, refetch, error, isLoading } = useProducts();
  const { authToken: token } = useAuth();
  console.log(token);

  const {
    products,
    image,
    isAdding,
    isEditing,
    editProduct,
    productDescription,
  } = state;
  const formRef = useRef();

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      dispatch({ type: "loadProducts", payload: initialProducts });
    }
  }, [initialProducts, dispatch]);

  function toggleAddForm() {
    dispatch({ type: "toggleAdd" });
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
    console.log(image);

    if (
      !productName ||
      !productPrice ||
      !productStockQuantity ||
      !productCategory ||
      !productDescription ||
      !image
    ) {
      return alert("Empty fields are not allowed");
    }

    let productData = {
      name: productName,
      price: productPrice,
      stock_quantity: productStockQuantity,
      category_id: productCategory,
      product_description: productDescription,
    };

    const createData = new FormData();
    createData.append("image", image);
    createData.append(
      "product",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );

    if (type === "post") {
      await createProduct(createData)
        .then(() => {
          refetch();
          formRef.current.reset();
        })
        .catch((error) => console.log(error));

      dispatch({ type: "toggleAdd" });
    }

    if (type === "put") {
      productData = { id: editProduct?.id, ...productData };
      axios
        .put(`${BASE_URL}/products`, productData)
        .then(() => {
          refetch();
          formRef.current.reset();
        })
        .catch((error) => console.log(error));

      dispatch({ type: "closeEdit" });
    }
  }

  function remove(productId) {
    axios
      .delete(`${BASE_URL}/products/${productId}`)
      .catch((err) => console.log(err));
    dispatch({
      type: "loadProducts",
      payload: products.filter((product) => product.id !== productId),
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <>
      <Main>
        {(isAdding || isEditing) && <div className={styles.overlay} />}

        <div className={styles.addProductContainer}>
          <span onClick={toggleAddForm} className={styles.openAddProductButton}>
            Add Product +
          </span>
          <ProductForm
            formRef={formRef}
            handleImageChange={handleImageChange}
            send={send}
          />
          {products?.length === 0 && (
            <div className={styles.emptyMessage}>
              There are no products registered!
            </div>
          )}
          <ProductsList
            products={products}
            dispatch={dispatch}
            removeProduct={remove}
            refetch={refetch}
          />
        </div>
      </Main>
    </>
  );
}

export default ManageProduct;
