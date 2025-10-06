import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado dentro de ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (title, message, variant = "success") => {
    const id = Date.now();
    const newToast = { id, title, message, variant, show: true };

    setToasts((prev) => [...prev, newToast]);

    // Remove o toast após 3 segundos
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};
