import { MoonLoader } from "react-spinners";
import useCategories from "@api/categories/categories.api";

import styles from "./ProductForm.module.css";
import { useDispatch, useSelector } from "react-redux";

import { resetProductForm } from "../../../../actions/productFormActions";
import { useState, useEffect } from "react";
import useProductAddForm from "@hooks/products/useProductAddForm";
import useProductEditForm from "@hooks/products/useProductEditForm";

function ProductForm({ formRef, onEdit, onAdd, handleOpenForm }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.productForm);
  const [image, setImage] = useState(null);
  const { data: categories, error, isLoading } = useCategories();
  const { isEditingProduct, editProduct, isAddingProduct } = state;

  const productAddForm = useProductAddForm(
    (e) => handleSendData(e),
    isAddingProduct
  );
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

    console.log(productRequest);
    formData.append(
      "product",
      new Blob([JSON.stringify(productRequest)], { type: "application/json" })
    );

    if (image) {
      formData.append("image", image);
    }

    if (state.isEditingProduct) {
      onEdit(formData);
    } else {
      formData.forEach((key, value) => console.log(value, key));
      onAdd(formData);
    }

    handleClearForm();
  }

  function handleCloseForm() {
    dispatch(resetProductForm());
  }

  function handleClearForm() {
    dispatch(resetProductForm);
    resetForm();

    if (formRef.current) {
      formRef.current.reset();
    }
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
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
