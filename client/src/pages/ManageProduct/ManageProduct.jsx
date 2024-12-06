import { useEffect, useRef } from "react";
import axios from "axios";
import { useFormContext } from "../../hooks/useFormContext"; 
import { BASE_URL } from "../../config";
import useProducts from "../../api/products.api"; 
import Main from "../../components/Main/Main";
import ProductsList from "../../components/ProductsList/ProductsList";
import ProductForm from "./ProductForm/ProductForm";
import styles from "./ManageProduct.module.css"; 

function ManageProduct({ categories }) {
  // Accessing state and dispatch from the FormContext
  const { state, dispatch } = useFormContext();

  const {
    products,
    image,
    isAdding,
    isEditing,
    editProduct,
    productDescription,
  } = state;
  const formRef = useRef();

  // Fetch the initial products list using custom hook
  const { data: initialProducts, refetch, error, isLoading } = useProducts();

  // When initial products data is fetched, load them into the context state
  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      dispatch({ type: "loadProducts", payload: initialProducts });
    }
  }, [initialProducts, dispatch]);

  // Toggle visibility of the form (Add/Edit Product)
  function toggleAddForm() {
    dispatch({ type: "toggleAdd" });
  }

  // Handle image changes for the product form
  async function handleImageChange(e) {
    const file = e.target.files[0];
    dispatch({ type: "setImage", payload: file });
  }

  // Send the product data (either POST or PUT based on the action)
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

    // Validate required fields before submitting the form
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

    // POST request to add a new product
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

    // PUT request to edit an existing product
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

  // Handle product deletion
  function remove(productId) {
    // TODO: Add confirmation for product deletion
    axios
      .delete(`${BASE_URL}/products/${productId}`)
      .catch((err) => console.log(err));
    dispatch({
      type: "loadProducts",
      payload: products.filter((product) => product.id !== productId),
    });
  }

  // Handle loading state and errors
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
          {/* Button to open Add Product form */}
          <span onClick={toggleAddForm} className={styles.openAddProductButton}>
            Add Product +
          </span>

          {/* Product Form for adding or editing a product */}
          <ProductForm
            formRef={formRef}
            handleImageChange={handleImageChange}
            send={send}
          />

          {/* If no products are available */}
          {products?.length === 0 && (
            <div className={styles.emptyMessage}>
              There are no products registered!
            </div>
          )}

          {/* Display list of products */}
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
