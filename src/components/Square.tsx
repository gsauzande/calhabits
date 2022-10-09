import React, { useState } from "react";
import { Col, Row } from "antd";
import "./Square.css";
import { useEffect } from "react";

type Props = {
  id: number;
  selected: boolean;
  onSquareClick: (key: number, selected: boolean) => void;
};
export const Square = ({ id, onSquareClick, selected }: Props) => {
  const handleClick = () => {
    onSquareClick(id, !selected);
    console.log(id, !selected);
  };

  return (
    <div
      className={`square ${selected ? "selected" : null}`}
      onClick={handleClick}
    ></div>
  );
};
