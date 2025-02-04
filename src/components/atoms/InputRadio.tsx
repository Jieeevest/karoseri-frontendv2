import React from "react";

interface InputRadioProps {
  label?: string;
  name?: string;
  checked?: boolean;
  size?: "sm" | "lg";
  onChange?: (e: boolean) => void;
  isDisabled?: boolean;
  value?: string;
  className?: string;
}

const InputRadio: React.FC<InputRadioProps> = ({
  label = "Radio",
  name,
  checked,
  size,
  onChange,
  isDisabled,
  value,
  className = "",
}) => {
  const radioSize = {
    sm: "radio-sm",
    lg: "radio-lg",
  };
  return (
    <div className={`relative ${className}`}>
      <label className="form-label flex items-center gap-2.5">
        <input
          name={name}
          className={`radio ${size && radioSize[size]}`}
          type="radio"
          value={value}
          checked={checked}
          onChange={(e) => onChange && onChange(e.target.checked)}
          aria-checked={checked}
          disabled={isDisabled}
        />
        {label}
      </label>
    </div>
  );
};

export default InputRadio;
