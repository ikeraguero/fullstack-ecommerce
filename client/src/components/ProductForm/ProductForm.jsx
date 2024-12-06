import useCategories from "../../api/categories.api";
import { useFormContext } from "../../hooks/useFormContext";
import styles from "./ProductForm.module.css";

function Form({ formRef, handleImageChange, send }) {
  const { state, dispatch } = useFormContext();
  const { data: categories, error, isLoading } = useCategories();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading products: {error.message}</div>;
  }

  const {
    isAdding,
    isEditing,
    editProduct,
    productName,
    productCategory,
    productDescription,
    productPrice,
    productQuantity,
  } = state;
  return (
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
          <label htmlFor="productStockQuantity">Product Stock Quantity</label>
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
            value={isEditing ? productDescription : null}
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

export default Form;
