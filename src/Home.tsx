import React, { useEffect, useState } from "react";
import { Col, Input, InputNumber, Row, Select, Typography } from "antd";
import { Square } from "./components/Square";
export const Home = () => {
  const savedYearCount = JSON.parse(localStorage.getItem("yearCount") || "1");
  const [years, setYears] = useState<number>(savedYearCount || 1);
  const [squares, setSquares] = useState<number>(years * 365);
  const [selectedSquares, setSelectedSquares] = useState<{
    [key: number]: boolean;
  }>({});

  const onYearsChange = (value: number | null) => {
    if (!value) return;

    let formattedValue = value;
    if (value % 1 != 0) formattedValue = Math.round(value);

    setYears(formattedValue);
    localStorage.setItem("yearCount", JSON.stringify(value));
  };

  const setSelection = (key: number, selected: boolean) => {
    localStorage.setItem(
      "day",
      JSON.stringify({ ...selectedSquares, [key]: selected })
    );
    setSelectedSquares(JSON.parse(localStorage.getItem("day") || "{}"));
  };

  useEffect(() => {
    setSquares(365 * years);
    setSelectedSquares(JSON.parse(localStorage.getItem("day") || "{}"));
  }, [years]);

  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <Typography.Title level={2}>Life Calendar</Typography.Title>
        </Col>

        <Col span={12} offset={6}>
          Years:{" "}
          <InputNumber
            min={1}
            max={90}
            style={{ width: "100px" }}
            value={years}
            onChange={onYearsChange}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <Typography.Text italic strong>
            Each row represents a week.
          </Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          {Array.from(Array(squares).keys()).map((id: number) => {
            const currentDay = id + 1;
            return (
              <>
                {currentDay % 7 === 0 && (
                  <Row>
                    <Col span={20}>
                      <Square
                        key={id}
                        id={id}
                        selected={selectedSquares[id]}
                        onSquareClick={setSelection}
                      />
                    </Col>
                  </Row>
                )}
                {currentDay % 7 !== 0 && (
                  <Square
                    key={id}
                    id={id}
                    selected={selectedSquares[id]}
                    onSquareClick={setSelection}
                  />
                )}
              </>
            );
          })}
        </Col>
      </Row>
    </>
  );
};
