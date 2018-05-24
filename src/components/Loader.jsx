import React from "react";
import "../styles/Loader.css";

const Loader = props => {
  return (
    <div className="load-screen">
      <img
        id="loader"
        alt="chart emoji"
        src="http://www.emoji.co.uk/files/mozilla-emojis/objects-mozilla/11933-chart-with-upwards-trend.png"
      />
    </div>
  );
};

export default Loader;
