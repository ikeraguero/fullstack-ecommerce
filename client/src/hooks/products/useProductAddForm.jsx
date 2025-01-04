import { useFormik } from "formik";
import { validationSchemaPayment } from "../../schemas/validationSchema";
import { useState, useEffect } from "react";

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
      productCategory: "",
      productDescription: "",
      productImage: "",
    });
  }, []);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true, 
    validationSchema: validationSchemaPayment,
    onSubmit: onSubmitCallback,
  });

  return formik;
}

export default useProductAddForm;
