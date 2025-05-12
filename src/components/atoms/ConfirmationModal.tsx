import React from "react";
import { Button } from ".";

interface ConfirmationModalProps {
  showModal?: boolean;
  title?: string;
  message?: string;
  buttonColor?: string;
  buttonText?: string;
  handleClose?: () => void;
  handleConfirm?: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  showModal = false,
  title = "Confirmation",
  message = "By submitting you'll initiate the account creation process for the specified email address. An activation email will be sent to the recipient's inbox, containing instructions to set their password.  If you're unsure, save instead.",
  buttonColor = "btn-primary",
  buttonText = "Submit",
  handleClose,
  handleConfirm,
}) => {
  return (
    showModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        id="confirmation_modal"
      >
        <div className="relative bg-white rounded-lg shadow-lg max-w-[540px] w-full py-5 px-10">
          <div className="flex justify-center items-center p-4">
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
                Batal
              </button>
              <button className={`btn ${buttonColor}`} onClick={handleConfirm}>
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmationModal;
