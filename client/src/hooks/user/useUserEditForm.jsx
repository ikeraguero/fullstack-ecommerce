import { useFormik } from "formik";
import { validationSchemaPayment } from "../../schemas/validationSchema";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function useUserEditForm(onSubmitCallback) {
  const state = useSelector((state) => state.userForm);
  const { isEditingUser, editUser } = state;

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleId: "",
  });

  useEffect(() => {
    setInitialValues({
      firstName: isEditingUser ? editUser?.userFirstName || "" : "",
      lastName: isEditingUser ? editUser.userLastName || "" : "",
      email: isEditingUser ? editUser.userEmail || "" : "",
      password: "",
      roleId: isEditingUser ? editUser.userRoleId || "" : "",
    });
  }, [isEditingUser, editUser]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: validationSchemaPayment,
    onSubmit: onSubmitCallback,
  });

  return formik;
}

export default useUserEditForm;
