import React from "react";
import "./Square.css";

type Props = {
  id: number;
  selected: boolean;
  onSquareClick: (key: number, selected: boolean) => void;
};
export const Square = ({ id, onSquareClick, selected }: Props) => {
  const handleClick = () => {
    onSquareClick(id, !selected);
  };

  return (
    <div
      className={`square ${selected ? "selected" : null}`}
      onClick={handleClick}
    ></div>
  );
};
