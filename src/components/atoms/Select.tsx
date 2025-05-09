import React from "react";
import Select from "react-select";

interface SelectProps {
  optionValue: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  label?: string;
  required?: boolean;
  size?: "sm" | "lg";
  border?: "danger" | "success";
  onChange?: (selectedOption: any) => void;
  value?: { label: string; value: string } | null;
  isDisabled?: boolean;
  className?: string;
  error?: string;
}

const CustomSelect: React.FC<SelectProps> = ({
  optionValue,
  placeholder,
  label = "",
  required = false,
  size,
  border,
  onChange,
  value,
  isDisabled = false,
  className = "",
  error,
}) => {
  const selectSize = {
    sm: "text-sm",
    lg: "text-lg py-3",
  };

  const borderColor = {
    danger: "border border-red-500",
    success: "border border-green-500",
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 cursor-pointer">
        {/* Label */}
        {label && (
          <label className="form-label max-w-44" htmlFor={label}>
            {label}
            {required && <span className="text-danger">*</span>}
          </label>
        )}

        {/* Select Component */}
        <div className="relative w-full">
          <Select
            placeholder={placeholder || "Select an option"}
            instanceId={`${label}-select`}
            options={optionValue}
            isDisabled={isDisabled}
            value={value}
            onChange={onChange}
            classNamePrefix="react-select"
            className={`react-select-container ${
              size ? selectSize[size] : ""
            } ${border ? borderColor[border] : ""}`}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
