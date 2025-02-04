import React, { Fragment } from "react";

interface BadgeProps {
  text?: string;
  appearance?: "primary" | "success" | "info" | "danger" | "warning" | "dark";
  type?: "default" | "outline" | "pill";
  className?: string;
}

const DefaultBadge: React.FC<BadgeProps> = ({
  text = "Badge",
  appearance = "primary",
  type = "default",
  className,
}) => {
  const appearanceType = {
    primary: "badge-primary",
    success: "badge-success",
    info: "badge-info",
    danger: "badge-danger",
    warning: "badge-warning",
    dark: "badge-dark",
  };

  const bagdeType = {
    default: "",
    outline: "badge-outline",
    pill: "badge-pill",
  };

  return (
    <Fragment>
      <span
        className={`badge ${bagdeType[type]} ${appearanceType[appearance]} ${className}`}
      >
        {text}
      </span>
    </Fragment>
  );
};

export default DefaultBadge;
