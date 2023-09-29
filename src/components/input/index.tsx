import React, { InputHTMLAttributes } from "react";
import "./input.scss";
import { ErrorMessage, Field } from "formik";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: JSX.Element;
  name: string;
}

const Input: React.FC<InputProps> = (props) => {
  const { name, label, icon, type = "text", ...rest } = props;

  return (
    <div className="input-wrapper">
      <div className="label-content">
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="input-content">
        <Field name={name} id={name} type={type} {...rest} />
        {icon && <div className="icon">{icon}</div>}
      </div>
      <ErrorMessage className="errorMsg" component="div" name={name} />
    </div>
  );
};

export default Input;
