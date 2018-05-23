import React from "react";
import "../styles/RangeList.css";
import { Link } from "react-router-dom";

const RangeList = props => {
  const ranges = ["5y", "2y", "1y", "ytd", "6m", "3m", "1m"].map(option => {
    return (
      <li className="range-option">
        <Link
          to={`/featured/${props.symbol}/${option}`}
          key={`option-${option}`}
        >
          {option}
        </Link>
      </li>
    );
  });
  return (
    <div>
      <h4>Choose a date range:</h4>
      <div className="range-list">{ranges}</div>
    </div>
  );
};

export default RangeList;
