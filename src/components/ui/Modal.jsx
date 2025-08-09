'use client'
import React, { useEffect, useRef } from 'react';

const Modal = ({ open, onClose, children, className }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    if (open) {
      dialogNode?.showModal();
    } else {
      dialogNode?.close();
    }
  }, [open]);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    const handleCancel = (event) => {
      event.preventDefault();
      onClose();
    };
    dialogNode?.addEventListener('cancel', handleCancel);
    return () => {
      dialogNode?.removeEventListener('cancel', handleCancel);
    };
  }, [onClose]);

  return (
    <dialog ref={dialogRef} className={`modal ${className}`}>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
        </form>
        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

const ModalHeader = ({ children, className }) => {
  return <h3 className={`font-bold text-lg ${className}`}>{children}</h3>;
};

const ModalBody = ({ children, className }) => {
  return <div className={`py-4 ${className}`}>{children}</div>;
};

const ModalActions = ({ children, className }) => {
  return <div className={`modal-action ${className}`}>{children}</div>;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Actions = ModalActions;

export default Modal;
