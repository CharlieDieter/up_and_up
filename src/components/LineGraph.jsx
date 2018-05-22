import React, { Component } from "react";
import { parseTime } from "../util/d3_util.js";

class LineGraph extends Component {
  static defaultProps = {
    margins: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    },
    width: 700,
    height: 500,
    data: {}
  };

  componentDidMount() {}

  createLineGraph() {
    const node = this.graphNode;
    const { margins, width, height, data } = this.props;
    const width = width - margin.left - margin.right;
    const height = height - margin.top - margin.bottom;
  }

  render() {
    return <svg ref={node => (this.graphNode = node)} />;
  }
}

export default LineGraph;
