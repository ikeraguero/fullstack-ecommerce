import { createContext, useContext, useState } from "react";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [isErrorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Error");
  const openError = (type = null) => {
    setErrorOpen(true);
    setTimeout(() => {
      setErrorOpen(false);
    }, 4000);
  };

  return (
    <AlertContext.Provider
      value={{
        isErrorOpen,
        setErrorOpen,
        openError,
        setErrorMessage,
        errorMessage,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
