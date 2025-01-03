import { createContext, useContext, useState } from "react";

const SuccessContext = createContext();

export function SuccessProvider({ children }) {
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("Success");
  const openSuccess = (type = null) => {
    setSuccessOpen(true);
    setTimeout(() => {
      setSuccessOpen(false);
    }, 4000);
  };

  function displaySuccess(successMessage) {
    setSuccessMessage(successMessage);
    openSuccess();
  }

  return (
    <SuccessContext.Provider
      value={{
        isSuccessOpen,
        setSuccessOpen,
        displaySuccess,
        successMessage,
      }}
    >
      {children}
    </SuccessContext.Provider>
  );
}

export function useSuccess() {
  return useContext(SuccessContext);
}
