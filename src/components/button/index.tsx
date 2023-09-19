import React, { ButtonHTMLAttributes } from "react";
import "./button.scss";

interface button extends ButtonHTMLAttributes<HTMLButtonElement> {
  varient: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  children?: React.ReactNode;
}

const Button: React.FC<button> = ({
  varient,
  size,
  children,
  type = "button",
  ...rest
}) => {
  return (
    <div>
      <button type={type} className={`btn btn-${varient} ${size}`} {...rest}>
        {children}
      </button>
    </div>
  );
};

export default Button;
