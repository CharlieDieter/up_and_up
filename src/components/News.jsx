import React from "react";
import { Link } from "react-router-dom";

const News = props => {
  console.log(props.data);
  return props.data ? (
    <div>
      <h3>In the news:</h3>
      {props.data.map(n => (
        <div>
          <h5>
            <a href={n.url}>{n.headline}</a>
          </h5>
          <h6>{n.source}</h6>
        </div>
      ))}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default News;
