import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { validationSchemaProduct } from "../../schemas/validationSchema";

function useProductAddForm(onSubmitCallback) {
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
      productName: "",
      productPrice: "",
      productStockQuantity: "",
      productCategory: 1,
      productDescription: "",
      productImage: "",
    });
  }, []);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: validationSchemaProduct,
    onSubmit: onSubmitCallback,
  });

  return formik;
}

export default useProductAddForm;
