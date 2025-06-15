import React from "react";
import Spinner from "../Icons/SpinnerIcon";

type ButtonProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
}) => (
  <button
    className={`font-bold py-2 px-4 rounded-lg cursor-pointer flex items-center justify-center ${className}`}
    onClick={onClick}
    type={type}
    disabled={disabled || loading}
  >
    {loading && <Spinner />}
    {children}
  </button>
);

export default Button;
