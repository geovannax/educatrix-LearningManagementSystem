import React from "react";
import {
  Toast,
  ToastContainer as BootstrapToastContainer,
} from "react-bootstrap";
import { useToast } from "../../contexts/ToastContext";

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <BootstrapToastContainer
      position="top-end"
      className="p-3 mt-5"
      style={{ zIndex: 9999 }}
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          show={toast.show}
          onClose={() => removeToast(toast.id)}
          delay={5000}
          autohide
        >
          <Toast.Header
            closeButton
            className={`bg-${toast.variant} text-white`}
          >
            <strong className="me-auto">{toast.title}</strong>
          </Toast.Header>
          <Toast.Body className="bg-gray-light">{toast.message}</Toast.Body>
        </Toast>
      ))}
    </BootstrapToastContainer>
  );
}

export default ToastContainer;
