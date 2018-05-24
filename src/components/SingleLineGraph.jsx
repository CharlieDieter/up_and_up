import React, { Component } from "react";
import { parseTime } from "../util/d3_util";
import { scaleLinear, scaleTime } from "d3-scale";
import { line, curveBasis } from "d3-shape";
import { select, selectAll } from "d3-selection";
import { axisLeft, axisBottom } from "d3-axis";
import { extent } from "d3-array";
import ColorHash from "color-hash";
import "../styles/LineGraph.css";

class SingleLineGraph extends Component {
  static defaultProps = {
    margin: {
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

  // TODO: use .enter() and exit().remove() to have transitions
  // TODO: fix grid to follow y-axis tick lines
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.data.chart.length !== this.props.data.chart.length ||
      nextProps.data.quote.symbol !== this.props.data.quote.symbol
    ) {
      this.props.data.chart = nextProps.data.chart;
      this.props.data.quote = nextProps.data.quote;
      select(".single-line").remove();
      select(".y-axis").remove();
      select(".y-axis-label").remove();
      select(".x-axis").remove();
      selectAll(".grid").remove();
      this.createLineGraph();
    }
  }

  createLineGraph() {
    const { margin, totalWidth, totalHeight, data } = this.props;
    const colorHash = new ColorHash();
    const width = totalWidth - margin.left - margin.right;
    const height = totalHeight - margin.top - margin.bottom;
    const node = select(this.graphNode);

    const g = node
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("class", "maingroup")
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = scaleTime().range([0, width]);
    const y = scaleLinear().range([height, 0]);

    const valueline = line()
      .curve(curveBasis)
      .x(function(d) {
        return x(parseTime(d.date));
      })
      .y(function(d) {
        return y(d.close);
      });

    const dates = data.chart.map(d => parseTime(d.date));

    g
      .append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0, ${height})`)
      .call(
        axisBottom(x)
          .ticks(dates.length % 10)
          .tickSize(-height)
          .tickFormat("")
      );

    g
      .append("g")
      .attr("class", "grid")
      .call(
        axisLeft(y)
          .ticks(10)
          .tickSize(-width)
          .tickFormat("")
      );

    x.domain(extent(dates, date => date));
    y.domain(extent(data.chart, c => c.close));

    g
      .append("path")
      .data([data.chart])
      .style("stroke", colorHash.hex(data.quote.symbol.toLowerCase()))
      .attr("class", "single-line")
      .attr("d", valueline);

    g
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x))
      .attr("class", "x-axis");

    g
      .append("g")
      .call(axisLeft(y))
      .attr("class", "y-axis");
    g
      .append("g")
      .append("text")
      .attr("class", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("x", -6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(`price  ($)`);

    g
      .append("path")
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");
  }

  render() {
    return <svg className="graph" ref={node => (this.graphNode = node)} />;
  }
}

export default SingleLineGraph;
