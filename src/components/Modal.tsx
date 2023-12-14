"use client";

import { createPortal } from "react-dom";
import { RxCross2 } from "react-icons/rx";

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
      <div className="absolute w-2/6 p-10 bg-white text-black rounded-md shadow shadow-gray-400 z-50">
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center 
    text-white text-xl bg-red-500 rounded-full"
          type="button"
          onClick={onClose}
        >
          <RxCross2 />
        </button>
        {children}
      </div>
    </div>,
    portal!
  );
};

export default Modal;
