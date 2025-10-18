import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function CustomModal({
  show,
  title,
  body,
  onConfirm,
  onCancel,
  confirmLabel = "Continuar",
  cancelLabel = "Cancelar",
  loading = false,
}) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{body}</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          {cancelLabel}
        </Button>
        <Button variant="danger" onClick={onConfirm} disabled={loading}>
          {loading && (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
            />
          )}
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
