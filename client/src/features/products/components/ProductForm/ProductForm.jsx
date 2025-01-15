import { useState, useEffect } from "react";

import styles from "./ProductForm.module.css";
import useCategories from "@api/categories/categories.api";
import useProductAddForm from "@hooks/products/useProductAddForm";
import useProductEditForm from "@hooks/products/useProductEditForm";
import LoadingState from "@features/shared/components/LoadingState/LoadingState";
import ErrorState from "@features/shared/components/ErrorState/ErrorState";
import { useProductForm } from "@context/useProductFormContext";

function ProductForm({ onEdit, onAdd }) {
  const [image, setImage] = useState(null);
  const { data: categories, error, isLoading } = useCategories();
  const { isEditingProduct, editProduct, isAddingProduct, resetProductForm } =
    useProductForm();

  const productAddForm = useProductAddForm((e) => handleSendData(e));
  const productEditForm = useProductEditForm((e) => handleSendData(e));

  const { values, handleChange, resetForm } = isEditingProduct
    ? productEditForm
    : productAddForm;

  useEffect(() => {
    if (isAddingProduct) {
      resetForm();
    }
  }, [isAddingProduct]);

  function handleSendData(e) {
    e.preventDefault();

    const formData = new FormData();
    const productRequest = {
      id: editProduct?.id || null,
      name: values.productName,
      price: Number(values.productPrice),
      stockQuantity: Number(values.productStockQuantity),
      categoryId: Number(values.productCategory),
      categoryName: "",
      productDescription: values.productDescription,
    };

    formData.append(
      "product",
      new Blob([JSON.stringify(productRequest)], { type: "application/json" })
    );

    if (image) {
      formData.append("image", image);
    }

    console.log(formData);

    const submitFunction = isEditingProduct ? onEdit : onAdd;
    submitFunction(formData);

    resetProductForm();
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div>
      <span className={styles.formTop}>
        {!isEditingProduct ? "Add New Product" : `Edit ${editProduct?.name}`}
        <ion-icon name="close-outline" onClick={resetProductForm}></ion-icon>
      </span>
      <form
        className={styles.formBody}
        onSubmit={(e) => {
          e.preventDefault();
          handleSendData(e);
        }}
      >
        <div className={styles.formItem}>
          <label htmlFor="productName">Name</label>
          <input
            onChange={handleChange}
            name="productName"
            className={styles.addFormInput}
            value={values.productName}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="productPrice">Price</label>
          <input
            onChange={handleChange}
            name="productPrice"
            className={styles.addFormInput}
            value={values.productPrice}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="productStockQuantity">Stock Quantity</label>
          <input
            onChange={handleChange}
            name="productStockQuantity"
            value={values.productStockQuantity}
            className={styles.addFormInput}
          />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="productCategory">Category</label>
          <select
            onChange={handleChange}
            name="productCategory"
            id="productCategory"
            value={values.productCategory}
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
            value={values.productDescription}
            onChange={handleChange}
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
