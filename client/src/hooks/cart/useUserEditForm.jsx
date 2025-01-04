import { useFormik } from "formik";
import { validationSchemaShipping } from "../../schemas/validationSchema";
import { useSelector } from "react-redux";

export function useUserEditForm(onSubmitCallback) {
  const email = useSelector((state) => state.auth.email);
  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  return useFormik({
    initialValues: {
      firstName,
      lastName,
      email,
      password: "",
    },
    validationSchema: validationSchemaShipping,
    onSubmit: onSubmitCallback,
  });
}

export default useUserEditForm;
