import React from "react";

interface StepperProps {
  className?: string;
}

const Stepper: React.FC<StepperProps> = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <form action="#" className="w-full" method="post">
        <div data-stepper="true">
          <div className="card">
            <div className="card-header flex justify-between items-center gap-4 py-8">
              <div
                className="active flex gap-2.5 items-center"
                data-stepper-item="#stepper_1"
              >
                <div className="rounded-full size-10 flex items-center justify-center text-md font-semibold bg-primary-light text-primary stepper-item-active:bg-primary stepper-item-active:text-primary-inverse stepper-item-completed:bg-success stepper-item-completed:text-success-inverse">
                  <span
                    className="stepper-item-completed:hidden"
                    data-stepper-number="true"
                  >
                    1
                  </span>
                  <i className="ki-outline ki-check text-xl hidden stepper-item-completed:inline"></i>
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-sm font-medium text-gray-900 stepper-item-completed:text-gray-600">
                    Step 1
                  </h4>
                  <span className="text-2sm text-gray-700 stepper-item-completed:text-gray-400">
                    Description
                  </span>
                </div>
              </div>
              <div
                className="flex gap-2.5 items-center"
                data-stepper-item="#stepper_2"
              >
                <div className="rounded-full size-10 flex items-center justify-center text-md font-semibold bg-primary-light text-primary stepper-item-active:bg-primary stepper-item-active:text-primary-inverse stepper-item-completed:bg-success stepper-item-completed:text-success-inverse">
                  <span
                    className="stepper-item-completed:hidden"
                    data-stepper-number="true"
                  >
                    2
                  </span>
                  <i className="ki-outline ki-check text-xl hidden stepper-item-completed:inline"></i>
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-sm font-medium text-gray-900 stepper-item-completed:text-gray-600">
                    Step 2
                  </h4>
                  <span className="text-2sm text-gray-700 stepper-item-completed:text-gray-400">
                    Description
                  </span>
                </div>
              </div>
              <div
                className="flex gap-2.5 items-center"
                data-stepper-item="#stepper_3"
              >
                <div className="rounded-full size-10 flex items-center justify-center text-md font-semibold bg-primary-light text-primary stepper-item-active:bg-primary stepper-item-active:text-primary-inverse stepper-item-completed:bg-success stepper-item-completed:text-success-inverse">
                  <span
                    className="stepper-item-completed:hidden"
                    data-stepper-number="true"
                  >
                    3
                  </span>
                  <i className="ki-outline ki-check text-xl hidden stepper-item-completed:inline"></i>
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-sm font-medium text-gray-900 stepper-item-completed:text-gray-600">
                    Step 3
                  </h4>
                  <span className="text-2sm text-gray-700 stepper-item-completed:text-gray-400">
                    Description
                  </span>
                </div>
              </div>
              <div
                className="flex gap-2.5 items-center"
                data-stepper-item="#stepper_4"
              >
                <div className="rounded-full size-10 flex items-center justify-center text-md font-semibold bg-primary-light text-primary stepper-item-active:bg-primary stepper-item-active:text-primary-inverse stepper-item-completed:bg-success stepper-item-completed:text-success-inverse">
                  <span
                    className="stepper-item-completed:hidden"
                    data-stepper-number="true"
                  >
                    4
                  </span>
                  <i className="ki-outline ki-check text-xl hidden stepper-item-completed:inline"></i>
                </div>
                <div className="flex flex-col gap-0.5">
                  <h4 className="text-sm font-medium text-gray-900 stepper-item-completed:text-gray-600">
                    Step 4
                  </h4>
                  <span className="text-2sm text-gray-700 stepper-item-completed:text-gray-400">
                    Description
                  </span>
                </div>
              </div>
            </div>
            <div className="card-body py-16">
              <div className="" id="stepper_1">
                <div className="flex items-center justify-center text-3xl font-semibold text-gray-900">
                  Step 1
                </div>
              </div>
              <div className="hidden" id="stepper_2">
                <div className="flex items-center justify-center text-3xl font-semibold text-gray-900">
                  Step 2
                </div>
              </div>
              <div className="hidden" id="stepper_3">
                <div className="flex items-center justify-center text-3xl font-semibold text-gray-900">
                  Step 3
                </div>
              </div>
              <div className="hidden" id="stepper_4">
                <div className="flex items-center justify-center text-3xl font-semibold text-gray-900">
                  Step 4
                </div>
              </div>
            </div>
            <div className="card-footer py-8 flex justify-between">
              <div>
                <button
                  className="btn btn-light stepper-first:hidden"
                  data-stepper-back="true"
                >
                  Back
                </button>
              </div>
              <div>
                <button
                  className="btn btn-light stepper-last:hidden"
                  data-stepper-next="true"
                >
                  Next
                </button>
                <button className="btn btn-primary hidden stepper-last:inline-flex">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Stepper;
