import useCategories from "../../api/categories.api";
import { useProductFormContext } from "../../hooks/useProductsFormContext";

import styles from "./ProductForm.module.css";

function ProductForm({ formRef, handleImageChange, send }) {
  const { state, dispatch } = useProductFormContext();
  const { data: categories, error, isLoading } = useCategories();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

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

  return (
    <div>
      <span className={styles.formTop}>
        {!isEditingProduct ? "Add New Product" : `Edit ${editProduct?.name}`}
        <ion-icon
          name="close-outline"
          onClick={() =>
            dispatch({ type: isAddingProduct ? "toggleAdd" : "closeEdit" })
          }
        ></ion-icon>
      </span>
      <form
        ref={formRef}
        className={styles.formBody}
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          if (isEditingProduct) {
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
            value={isEditingProduct ? productName : null}
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
            value={isEditingProduct ? productPrice : null}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="productStockQuantity">Product Stock Quantity</label>
          <input
            onChange={(e) =>
              dispatch({
                type: "changeQuantity",
                payload: e.target.value,
              })
            }
            name="productStockQuantity"
            value={isEditingProduct ? productQuantity : null}
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
            value={isEditingProduct ? productCategory : null}
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
          <label htmlFor="productDescription">Product Description</label>
          <input
            name="productDescription"
            value={isEditingProduct ? productDescription : null}
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
          <label htmlFor="productImage">Product Image</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <button className={styles.sendButton}>+</button>
      </form>
    </div>
  );
}

export default ProductForm;
