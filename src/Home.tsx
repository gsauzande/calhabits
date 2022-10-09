import React, { ChangeEventHandler, useEffect, useState } from "react";
import { Col, Input, Row, Select, Typography } from "antd";
import { Square } from "./components/Square";
export const Home = () => {
  const [timeFrame, setTimeFrame] = useState<number>(365);
  const [years, setYears] = useState<number>(1);
  const [squares, setSquares] = useState<number>(timeFrame * years);
  const [selectedSquares, setSelectedSquares] = useState<{
    [key: number]: boolean;
  }>({});

  const onTimeFrameChange = (value: number) => {
    setTimeFrame(value);
    console.warn("currentTimeFrameName()", value === 365 ? "day" : "week");
    setSelectedSquares(
      JSON.parse(localStorage.getItem(value === 365 ? "day" : "week") || "{}")
    );
  };
  const onYearsChange = (event: any) => {
    setYears(event.target.value);
  };

  const currentTimeFrameName = (): string =>
    timeFrame === 365 ? "day" : "week";

  // const selectedSquares = JSON.parse(
  //   localStorage.getItem(currentTimeFrameName()) || "{}"
  // );

  const setSelection = (key: number, selected: boolean) => {
    console.warn({ ...selectedSquares, [key]: selected });
    localStorage.setItem(
      currentTimeFrameName(),
      JSON.stringify({ ...selectedSquares, [key]: selected })
    );
    setSelectedSquares(
      JSON.parse(localStorage.getItem(currentTimeFrameName()) || "{}")
    );
  };

  useEffect(() => {
    setSquares(timeFrame * years);
    console.warn(currentTimeFrameName(), selectedSquares);
  }, [timeFrame, years, selectedSquares]);

  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <Typography.Title level={2}>Life Calendar</Typography.Title>
        </Col>
        <Col span={12} offset={6}>
          Time frame:
          <Select
            style={{ width: "100px" }}
            defaultValue={timeFrame}
            onChange={onTimeFrameChange}
          >
            <Select.Option value={365}>Day</Select.Option>
            <Select.Option value={52}>Week</Select.Option>
          </Select>
        </Col>
        <Col span={12} offset={6}>
          Years:{" "}
          <Input
            style={{ width: "100px" }}
            value={years}
            onChange={onYearsChange}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <>
            {Array.from(Array(squares).keys()).map((id: number) => (
              <Square
                key={id}
                id={id}
                selected={selectedSquares[id]}
                onSquareClick={setSelection}
              />
            ))}
          </>
        </Col>
      </Row>
    </>
  );
};
