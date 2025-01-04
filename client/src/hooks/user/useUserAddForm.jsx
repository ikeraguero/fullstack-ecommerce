import { useFormik } from "formik";
import { validationSchemaPayment } from "../../schemas/validationSchema";
import { useState, useEffect } from "react";

function useUsersForm(onSubmitCallback) {
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleId: "",
  });

  useEffect(() => {
    setInitialValues({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleId: 2,
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

export default useUsersForm;
