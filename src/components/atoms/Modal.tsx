import React from "react";
import { Button } from ".";

interface ModalProps {
  showModal?: boolean;
  title?: string;
  handleClose?: () => void;
  handleSubmit?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  showModal = false,
  title = "Modal Title",
  handleClose,
  handleSubmit,
}) => {
  return (
    showModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        id="modal_1"
      >
        <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <Button
              className={"text-gray-500 hover:text-gray-800 btn-sm"}
              text={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              }
              appearance="light"
              onClick={handleClose}
            />
          </div>
          <div className="p-6 text-gray-600">
            Modal components are commonly used for various purposes, such as
            displaying login forms, confirming actions, presenting multimedia
            content, or showing detailed information. They provide a
            non-intrusive way to engage users and guide them through specific
            tasks or actions while maintaining the context of the underlying
            webpage.
          </div>
          <div className="modal-footer justify-end">
            <div className="flex gap-2">
              <button
                className="btn btn-light"
                data-modal-dismiss="true"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
