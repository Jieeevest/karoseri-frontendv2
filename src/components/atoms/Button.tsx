import React from "react";

interface ButtonProps {
  text?: string | React.ReactNode;
  appearance?:
    | "primary"
    | "success"
    | "info"
    | "danger"
    | "warning"
    | "dark"
    | "light";
  type?: "default" | "outline" | "pill";
  icon?: string;
  onClick?: () => void;
  className?: string;
}

const DefaultButton: React.FC<ButtonProps> = ({
  text = "Button",
  appearance = "primary",
  type = "default",
  icon,
  onClick,
  className = "",
}) => {
  const buttonType = {
    default: "",
    outline: "btn-outline",
    pill: "badge-clear",
  };
  return (
    <button
      className={`${className} btn btn-${appearance} ${buttonType[type]}`}
      onClick={onClick}
    >
      {icon && <i className={`ki-outline ${icon}`}></i>}
      {text}
    </button>
  );
};

export default DefaultButton;
