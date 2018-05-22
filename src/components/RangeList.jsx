import React from "react";
import { Link } from "react-router-dom";

const RangeList = props => {
  const ranges = ["5y", "2y", "1y", "ytd", "6m", "3m", "1m"].map(opt => {
    return (
      <Link to={`/featured/${props.symbol}/${opt}`} key={`option-${opt}`}>
        {opt}
      </Link>
    );
  });
  return <div>{ranges}</div>;
};

export default RangeList;
