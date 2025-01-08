import { useFormik } from "formik";
import { validationSchemaProduct } from "../../schemas/validationSchema";
import { useState, useEffect } from "react";

function useProductFormBase(onSubmitCallback, initialData = {}) {
  const [initialValues, setInitialValues] = useState({
    productName: "",
    productPrice: "",
    productStockQuantity: "",
    productCategory: 1,
    productDescription: "",
    productImage: "",
    ...initialData,
  });

  const deepCompare = (obj1, obj2) =>
    JSON.stringify(obj1) === JSON.stringify(obj2);

  useEffect(() => {
    const newInitialValues = {
      ...initialValues,
      ...initialData,
      productCategory: initialData.productCategory || 1,
    };

    if (!deepCompare(newInitialValues, initialValues)) {
      setInitialValues(newInitialValues);
    }
  }, [initialData]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: validationSchemaProduct,
    onSubmit: onSubmitCallback,
  });

  return formik;
}

export default useProductFormBase;
