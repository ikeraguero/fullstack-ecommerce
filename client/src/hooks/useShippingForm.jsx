import { useFormik } from "formik";
import { validationSchemaShipping } from "../schemas/validationSchema";

export function useShippingForm(onSubmitCallback) {
  return useFormik({
    initialValues: {
      address: "",
      postalCode: "",
      city: "",
      state: "",
    },
    validationSchema: validationSchemaShipping,
    onSubmit: onSubmitCallback,
  });
}

export default useShippingForm;
