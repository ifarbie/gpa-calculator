import React from "react";


type ButtonProps = {
  children?: React.ReactNode;
  onClickHandler?: () => void;
  buttonText: string;
};

const Button = ({ children, onClickHandler, buttonText }: ButtonProps) => {
  return (
    <button className="border border-[#1690ed] text-[#1690ed] rounded-full px-3 py-1.5 text-md flex items-center gap-1.5" onClick={onClickHandler}>
      {children}
      <span>{buttonText}</span>
    </button>
  );
};

export default Button;
