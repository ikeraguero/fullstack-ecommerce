import { useFormik } from "formik";
import { validationSchemaPayment } from "../../schemas/validationSchema";
import { useState, useEffect } from "react";

function useUserFormBase(onSubmitCallback, initialData = {}) {
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleId: "",
    postalCode: "",
    address: "",
    country: "",
    city: "",
    ...initialData,
  });

  const deepCompare = (obj1, obj2) =>
    JSON.stringify(obj1) === JSON.stringify(obj2);

  useEffect(() => {
    const newInitialValues = {
      ...initialValues,
      ...initialData,
      roleId: initialData.roleId || 1,
    };

    if (!deepCompare(newInitialValues, initialValues)) {
      setInitialValues(newInitialValues);
    }
  }, [initialData]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: validationSchemaPayment,
    onSubmit: onSubmitCallback,
  });

  return formik;
}

export default useUserFormBase;
