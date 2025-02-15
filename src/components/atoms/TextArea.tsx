import React from "react";

interface TextAreaProps {
  label?: string;
  required?: boolean;
  size?: "default" | "sm" | "lg";
  border?: "default" | "danger" | "success";
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  value?: string;
  isDisabled?: boolean;
  placeholder?: string;
  className?: string;
  error?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  label = "Textarea",
  required = false,
  size = "default",
  border = "default",
  onChange,
  rows = 6,
  value,
  isDisabled = false,
  placeholder = "",
  className = "",
  error,
}) => {
  const inputSize = {
    default: "",
    sm: "textarea-sm",
    lg: "textarea-lg",
  };

  const borderColor = {
    default: "",
    danger: "border-danger",
    success: "border-success",
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
        {/* Label */}
        {label && (
          <label className="form-label max-w-44" htmlFor={label}>
            {label}
            {required && <span className="text-danger">*</span>}
          </label>
        )}
        <div className="relative w-full">
          <textarea
            className={`textarea w-full ${inputSize[size] || ""} ${
              borderColor[border] || ""
            }`}
            disabled={isDisabled}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            value={value}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default TextArea;
