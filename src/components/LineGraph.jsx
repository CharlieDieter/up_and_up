import React, { Component } from "react";
import { parseTime } from "../util/d3_util.js";
import { scaleLinear, scaleTime } from "d3-scale";
import { line } from "d3-shape";
import { select } from "d3-selection";
import ColorHash from "color-hash";

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

  componentDidMount() {
    this.createLineGraph();
  }

  createLineGraph() {
    const colorHash = new ColorHash();
    const node = this.graphNode;
    const { margins, width, height, data } = this.props;

    const x = scaleTime([0, width]);
    const y = scaleLinear([height, 0]);

    const valueLine = line()
      .x(d => x(d.date))
      .y(d => y(d.close));

    // TODO: add margins
    const svg = select(this.graphNode)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margins.left} ${margins.top})`);

    Object.keys(data).forEach(symbol => {
      console.log(colorHash.hex(symbol));
      svg.append("path").data([data[symbol]]);
    });
  }

  render() {
    return <svg ref={node => (this.graphNode = node)} />;
  }
}

export default LineGraph;
