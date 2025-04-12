import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  title: string;
  startIcon?: ReactElement;
  onClick?: ()=>void;
}

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultClasses =
  "flex items-center cursor-pointer py-2 font-normal justify-center gap-3 px-4 rounded-xl";

function Button({ variant,onClick, startIcon, title }: ButtonProps) {
  return (
    <button onClick={onClick} className={`${variantClasses[variant]} ${defaultClasses}`}>
      {startIcon}
      <p>{title}</p>
    </button>
  );
}

export default Button;
