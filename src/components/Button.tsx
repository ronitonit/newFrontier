import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  const buttonClass =
    "bg-blue-600 hover:bg-blue-700 px-4 py-2 block self-center m-auto rounded-full text-white font-bold py-2 px-4";

  return (
    <button onClick={onClick} className={buttonClass}>
      {text}
    </button>
  );
};

export default Button;
