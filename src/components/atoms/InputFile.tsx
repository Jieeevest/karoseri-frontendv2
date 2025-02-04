import React from "react";

interface InputFileProps {
  label?: string;
  size?: "default" | "sm" | "lg";
  border?: "default" | "danger" | "success";
  isMultiple?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  className?: string;
}

const InputFile: React.FC<InputFileProps> = ({
  label = "",
  size = "default",
  border = "default",
  isMultiple,
  onChange = () => {},
  isDisabled,
  className = "",
}) => {
  const inputSize = {
    default: "",
    sm: "file-input-sm",
    lg: "file-input-lg",
  };
  const borderColor = {
    default: "",
    danger: "border-danger",
    success: "border-success",
  };
  return (
    <div className={`relative ${className}`}>
      {label && <p className="form-label font-semibold mb-2">{label}</p>}
      <input
        className={`file-input cursor-pointer ${size && inputSize[size]} ${
          border && borderColor[border]
        }`}
        disabled={isDisabled}
        onChange={onChange}
        type="file"
        multiple={isMultiple}
      />
    </div>
  );
};

export default InputFile;
