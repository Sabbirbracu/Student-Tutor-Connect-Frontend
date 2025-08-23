import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

const Modal = ({ isOpen, onClose, title, children, size = "max-w-xl" }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) setShow(true);
  }, [isOpen]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => onClose(), 300); // wait for animation
  };

  if (!isOpen && !show) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Blurred background */}
      <div
        className={`absolute inset-0 bg-white/10 backdrop-blur-md transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      ></div>

      {/* Modal content */}
      <div
        className={`relative bg-white rounded-3xl shadow-xl w-full ${size} p-10 z-10 transform transition-all duration-300 ${
          show ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
        }`}
      >
        {/* Close button */}
        <button
          className="absolute top-6 right-6 text-gray-600 hover:text-gray-800"
          onClick={handleClose}
        >
          <FiX size={24} />
        </button>

        {/* Optional title */}
        {title && (
          <h2 className="text-4xl font-extrabold text-center text-gradient mb-6">
            {title}
          </h2>
        )}

        {/* Modal content */}
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
