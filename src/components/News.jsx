import React from "react";
import Loader from "./Loader";
const News = props => {
  return props.data ? (
    <div>
      <h3>In the news:</h3>
      {props.data.map(n => (
        <div key={`news-story-${n.url}`}>
          <h5>
            <a href={n.url}>{n.headline}</a>
          </h5>
          <h6>{n.source}</h6>
        </div>
      ))}
    </div>
  ) : (
    <Loader />
  );
};

export default News;
