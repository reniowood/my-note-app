import React from "react";
import { useSelector } from "react-redux";
import { selectLines } from "./documentSlice";
import { Line } from "../line/Line";

export function Document() {
  const lines = useSelector(selectLines);

  console.log(lines);

  return (
    <ul>
      {
        lines.map((content, index) => <Line index={index} content={content} />)
      }
    </ul>
  );
}