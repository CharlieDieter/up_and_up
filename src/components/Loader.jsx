import React from "react";
import { CSSTransitionGroup } from "react-transition-group";
import "../styles/Loader.css";

const Loader = props => {
  return (
    <CSSTransitionGroup
      transitionName="loading"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}
    >
      <div key="1" className="load-screen">
        <img
          id="loader"
          alt="chart emoji"
          src="http://www.emoji.co.uk/files/mozilla-emojis/objects-mozilla/11933-chart-with-upwards-trend.png"
        />
      </div>
    </CSSTransitionGroup>
  );
};

export default Loader;
