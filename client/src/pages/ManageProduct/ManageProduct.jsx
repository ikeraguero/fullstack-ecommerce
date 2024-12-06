import { useEffect, useRef } from "react";
import axios from "axios";
import { useFormContext } from "../../hooks/useFormContext";
import { BASE_URL } from "../../config";
import useProducts from "../../api/products.api";
import Main from "../../components/Main/Main";
import ProductsList from "../../components/ProductsList/ProductsList";
import ProductForm from "../../components/ProductForm/ProductForm";
import styles from "./ManageProduct.module.css";

function ManageProduct() {
  const { state, dispatch } = useFormContext();
  const { data: initialProducts, refetch, error, isLoading } = useProducts();

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

    let imageId = null;
    imageId = editProduct?.image_id;

    // Handle image upload
    if (!isEditing || image) {
      const formDt = new FormData();
      formDt.append("image", image);

      try {
        const response = await axios.post(`${BASE_URL}/images/upload`, formDt, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        imageId = response.data.id;
      } catch (err) {
        console.log(err);
      }
    }

    if (
      !productName ||
      !productPrice ||
      !productStockQuantity ||
      !productCategory ||
      !productDescription ||
      !imageId
    ) {
      return alert("Empty fields are not allowed");
    }

    let productData = {
      name: productName,
      price: productPrice,
      stock_quantity: productStockQuantity,
      category_id: productCategory,
      image_id: isEditing && !image ? editProduct?.image_id : imageId,
      product_description: productDescription,
    };

    if (type === "post") {
      axios
        .post(`${BASE_URL}/products`, productData)
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
