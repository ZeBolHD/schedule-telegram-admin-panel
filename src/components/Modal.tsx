"use client";

import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  const portal = document.getElementById("modal");

  const onClickModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="absolute w-full h-full inset-0 flex items-center justify-center 
    bg-black bg-opacity-30 backdrop-blur-sm z-10"
      onClick={onClickModal}
    >
      {children}
    </div>,
    portal!
  );
};

export default Modal;
