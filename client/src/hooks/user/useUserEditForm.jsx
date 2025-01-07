import { useFormik } from "formik";
import { validationSchemaPayment } from "../../schemas/validationSchema";
import { useState, useEffect } from "react";
import useUserForm from "./useUserForm";
import { useLocation } from "react-router-dom";
import useAuth from "@hooks/auth/useAuth";

function useUserEditForm(onSubmitCallback) {
  const { isEditingUser, editUser } = useUserForm();
  const location = useLocation();
  const { firstName, lastName, email, roleId } = useAuth();
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roleId: "",
  });

  useEffect(() => {
    if (location.pathname === "/profile") {
      setInitialValues({
        firstName,
        lastName,
        email,
        password: "",
        roleId,
      });
      return;
    }

    setInitialValues({
      firstName: isEditingUser ? editUser?.userFirstName || "" : "",
      lastName: isEditingUser ? editUser?.userLastName || "" : "",
      email: isEditingUser ? editUser?.userEmail || "" : "",
      password: "",
      roleId: isEditingUser ? editUser?.userRoleId || "" : "",
    });
  }, [isEditingUser, editUser, location.pathname]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: validationSchemaPayment,
    onSubmit: onSubmitCallback,
  });

  return formik;
}

export default useUserEditForm;
