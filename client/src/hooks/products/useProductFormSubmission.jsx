import { useState } from "react";

function useProductFormSubmission(
  isEditingProduct,
  editProduct,
  resetProductForm,
  onAdd,
  onEdit
) {
  const [image, setImage] = useState(null);

  const handleSendData = (values) => {

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

    const submitFunction = isEditingProduct ? onEdit : onAdd;
    submitFunction(formData);

    resetProductForm();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return {
    handleSendData,
    handleImageChange,
  };
}

export default useProductFormSubmission;
