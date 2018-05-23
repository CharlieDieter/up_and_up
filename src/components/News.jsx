import React from "react";
import { Link } from "react-router-dom";

const News = props => {
  const { news } = Object.values(props.data)[0][0];
  debugger;
  console.log(news);
  const component = (
    <div>
      {news.map(n => {
        return (
          <div>
            <h4>
              <Link to={n.url}>{n.headline}</Link>
            </h4>
            <h6>{n.source}</h6>
          </div>
        );
      })}
    </div>
  );
  return news ? <div>Loading...</div> : component;
};

export default News;

News.defaultProps = {
  data: { key: ["value"] }
};
