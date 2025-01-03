import { useFormik } from "formik";
import { validationSchemaPayment } from "../../schemas/validationSchema";

function usePaymentForm(onSubmitCallback) {
  return useFormik({
    initialValues: {
      paymentMethod: "",
      email: "",
      cardCvc: "",
      cardNumber: "",
      cardExpiration: "",
      cardholderName: "",
    },
    validationSchema: validationSchemaPayment,
    onSubmit: onSubmitCallback,
  });
}

export default usePaymentForm;
