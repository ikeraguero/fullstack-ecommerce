import { useFormik } from "formik";
import { useState, useEffect } from "react";
import useProductState from "./useProductState";
import { validationSchemaProduct } from "../../schemas/validationSchema";

function useProductEditForm(onSubmitCallback) {
  const { productFormState } = useProductState();
  const { isEditingProduct, editProduct } = productFormState;

  const [initialValues, setInitialValues] = useState({
    productName: "",
    productPrice: "",
    productStockQuantity: "",
    productCategory: "",
    productDescription: "",
    productImage: "",
  });

  useEffect(() => {
    setInitialValues({
      productName: isEditingProduct ? editProduct?.name || "" : "",
      productPrice: isEditingProduct ? editProduct?.price || "" : "",
      productStockQuantity: isEditingProduct
        ? editProduct?.stockQuantity || ""
        : "",
      productCategory: isEditingProduct ? editProduct?.categoryId || "" : "",
      productDescription: isEditingProduct
        ? editProduct?.productDescription || ""
        : "",
      productImage: "",
    });
  }, [isEditingProduct, editProduct]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: validationSchemaProduct,
    onSubmit: onSubmitCallback,
  });

  return formik;
}

export default useProductEditForm;
