import { useFormik } from "formik";
import { validationSchemaPayment } from "../../schemas/validationSchema";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function useProductEditForm(onSubmitCallback) {
  const state = useSelector((state) => state.productForm);
  const { isEditingProduct, editProduct } = state;

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
    validationSchema: validationSchemaPayment,
    onSubmit: onSubmitCallback,
  });

  return formik;
}

export default useProductEditForm;
