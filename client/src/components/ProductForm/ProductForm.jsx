import { MoonLoader } from "react-spinners";
import useCategories from "../../api/categories/categories.api";
import { useProductFormContext } from "../../hooks/useProductsFormContext";

import styles from "./ProductForm.module.css";

function ProductForm({ formRef, onAdd, onEdit, handleOpenForm }) {
  const { state, dispatch } = useProductFormContext();
  const { data: categories, error, isLoading } = useCategories();
  const {
    isAddingProduct,
    isEditingProduct,
    editProduct,
    productName,
    productCategory,
    productDescription,
    productPrice,
    productQuantity,
  } = state;

  function handleSendData(e) {
    const formData = new FormData(e.target);
    if (isEditingProduct) {
      onEdit(formData);
      return;
    }
    onAdd(formData);
    handleClearForm();
  }

  function handleCloseForm() {
    handleOpenForm({ type: isAddingProduct ? "toggleAdd" : "closeEdit" });
    handleClearForm();
  }

  function handleClearForm() {
    dispatch({ type: "reset" });

    if (formRef.current) {
      formRef.current.reset();
    }
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];
    dispatch({ type: "setImage", payload: file });
  }

  if (isLoading) {
    return (
      <div>
        <div className={styles.spinnerContainer}>
          <MoonLoader size={50} color="#000000" speedMultiplier={1} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  return (
    <div>
      <span className={styles.formTop}>
        {!isEditingProduct ? "Add New Product" : `Edit ${editProduct?.name}`}
        <ion-icon name="close-outline" onClick={handleCloseForm}></ion-icon>
      </span>
      <form
        ref={formRef}
        className={styles.formBody}
        onSubmit={(e) => {
          e.preventDefault();
          handleSendData(e);
        }}
      >
        <div className={styles.formItem}>
          <label htmlFor="productName">Name</label>
          <input
            onChange={(e) =>
              dispatch({ type: "changeName", payload: e.target.value })
            }
            name="productName"
            className={styles.addFormInput}
            value={isEditingProduct || productName ? productName : ""}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="productPrice">Price</label>
          <input
            onChange={(e) =>
              dispatch({ type: "changePrice", payload: e.target.value })
            }
            name="productPrice"
            className={styles.addFormInput}
            value={isEditingProduct || productPrice ? productPrice : ""}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="productStockQuantity">Stock Quantity</label>
          <input
            onChange={(e) =>
              dispatch({
                type: "changeQuantity",
                payload: e.target.value,
              })
            }
            name="productStockQuantity"
            value={isEditingProduct || productQuantity ? productQuantity : ""}
            className={styles.addFormInput}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="productCategory">Category</label>
          <select
            onChange={(e) =>
              dispatch({
                type: "changeCategory",
                payload: e.target.value,
              })
            }
            name="productCategory"
            id="productCategory"
            value={isEditingProduct || productCategory ? productCategory : ""}
            className={styles.addFormSelect}
          >
            {categories?.map((category) => (
              <option value={category?.id} key={category?.id}>
                {category?.name[0].toUpperCase() + category?.name.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formItem}>
          <label htmlFor="productDescription">Description</label>
          <input
            name="productDescription"
            value={
              isEditingProduct || productDescription ? productDescription : ""
            }
            onChange={(e) =>
              dispatch({
                type: "changeDescription",
                payload: e.target.value,
              })
            }
            className={styles.addFormInput}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="productImage">Image</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button className={styles.sendButton}>+</button>
      </form>
    </div>
  );
}

export default ProductForm;
