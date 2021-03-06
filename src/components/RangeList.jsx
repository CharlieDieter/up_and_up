import React from "react";
import "../styles/RangeList.css";
import { Link } from "react-router-dom";

const RangeList = props => {
  const ranges = ["5y", "2y", "1y", "ytd", "6m", "3m", "1m"]
    .filter(r => r !== props.range)
    .map(option => {
      return (
        <li className="range-option" key={`option-${option}`}>
          <Link to={`/featured/${props.symbol}/${option}`}>{option}</Link>
        </li>
      );
    });
  return (
    <div>
      <h4>Choose a different date range:</h4>
      <div className="range-list">{ranges}</div>
    </div>
  );
};

export default RangeList;
