import { useAlert } from "@context/AlertContext";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import SuccessAlert from "../SuccessAlert/SuccessAlert";
import { useSuccess } from "@context/SuccessContext";

function Alerts() {
  const { isErrorOpen, setErrorOpen, errorMessage } = useAlert();
  const { isSuccessOpen, setSuccessOpen, successMessage } = useSuccess();
  return (
    <>
      <SuccessAlert
        successOpen={isSuccessOpen}
        setOpen={setSuccessOpen}
        message={successMessage}
        aria-live="assertive"
      />
      <ErrorAlert
        isErrorOpen={isErrorOpen}
        setOpen={setErrorOpen}
        message={errorMessage}
        aria-live="assertive"
      />
    </>
  );
}

export default Alerts;
