import React from "react";
import { Button } from ".";

interface SuccessModalProps {
  showModal?: boolean;
  title?: string;
  message?: string;
  handleClose?: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  showModal = false,
  title = "Success",
  message = "Loremp ipsum dolor sit amet consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Nulla faucibus mauris et urna congue rhoncus. Nulla facilisi.",
  handleClose,
}) => {
  return (
    showModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        id="success_modal"
      >
        <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full py-5 px-10">
          <div className="flex items-center justify-center p-4 ">
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            {/* <Button
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
            /> */}
          </div>
          <div className="mb-10 text-gray-600 text-center">{message}</div>
          <div className="flex justify-center">
            <div className="flex gap-2">
              <button
                className="btn btn-light"
                data-modal-dismiss="true"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SuccessModal;
