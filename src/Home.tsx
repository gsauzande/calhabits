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
      <br />
      <Row>
        <Col span={12} offset={6}>
          <Typography.Title level={1}>
            <img
              src="/logo512.png"
              alt="Calhabits Life Calendar logo"
              width="50px"
              style={{ marginTop: "-7px", paddingRight: "10px" }}
            />
            Calhabits - Life Calendar
          </Typography.Title>
        </Col>

        <Col span={12} offset={6}>
          {"Amount of years you'd like to count"}:{" "}
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
          <Typography.Text strong underline>
            {" "}
            ☢️ DISCLAIMER ☢️
          </Typography.Text>
          <br />
          <Typography.Text italic strong>
            If you {"won't"}{" "}
            <Typography.Link
              href="https://www.lifewire.com/set-homepage-3483132"
              target="_blank"
            >
              make this page your homepage
            </Typography.Link>{" "}
            then this website {"isn't"} for you.
          </Typography.Text>
          <br />
          <Typography.Text italic strong>
            This website is for people like me that MUST look at their goal
            EVERY.SINGLE.DAY in order to not get lazy or procrastinate.
          </Typography.Text>

          <Typography.Title level={5}>Usage</Typography.Title>
          <Typography.Text>
            <i>Step 1 - </i>
            <strong>
              Click on a square every day you do something(tiny or big) to reach
              your goal
            </strong>
          </Typography.Text>
          <br />
          <Typography.Text>
            <i>Step 2 - </i> <strong>Close the page and GET 💩 DONE</strong>
          </Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <Typography.Text italic type="secondary">
            This 1996-looking website was created by{" "}
            <Typography.Link
              href="https://www.instagram.com/easysoftwaredeveloper/"
              target="_blank"
            >
              Gásten Sauzande
            </Typography.Link>
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
