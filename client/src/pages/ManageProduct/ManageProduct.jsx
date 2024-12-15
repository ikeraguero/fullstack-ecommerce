import { useEffect, useRef } from "react";
import axios from "axios";

import { useFormContext } from "../../hooks/useFormContext";
import { BASE_URL } from "../../config/config";
import useProducts, {
  useCreateProduct,
  useUpdateProduct,
} from "../../api/products.api";
import Main from "../../components/Main/Main";
import ProductsList from "../../components/ProductsList/ProductsList";
import ProductForm from "../../components/ProductForm/ProductForm";

import styles from "./ManageProduct.module.css";

function ManageProduct() {
  const { state, dispatch } = useFormContext();
  const { data: initialProducts, refetch, error, isLoading } = useProducts();
  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();

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

    if (type === "put") {
      productData.id = editProduct?.id;
    }

    const sendData = new FormData();
    sendData.append("image", image);
    sendData.append(
      "product",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );

    if (type === "post") {
      for (const [key, value] of sendData.entries()) {
        console.log(`${key}:`, value);
      }
      createProduct(sendData);
      dispatch({ type: "toggleAdd" });
    }

    if (type === "put") {
      for (const [key, value] of sendData.entries()) {
        console.log(`${key}:`, value);
      }
      updateProduct(sendData);
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

  console.log(products);

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
