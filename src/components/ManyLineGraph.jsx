import React, { Component } from "react";
import { parseTime } from "../util/d3_util";
import { scaleLinear, scaleTime } from "d3-scale";
import { line } from "d3-shape";
import { select } from "d3-selection";
import { axisLeft, axisBottom } from "d3-axis";
import { extent, max } from "d3-array";
import ColorHash from "color-hash";
import * as d3 from "d3";

class ManyLineGraph extends Component {
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

  createLineGraph() {
    const { margin, totalWidth, totalHeight, rawData } = this.props;
    const colorHash = new ColorHash();
    const width = totalWidth - margin.left - margin.right;
    const height = totalHeight - margin.top - margin.bottom;
    const node = select(this.graphNode);
    const g = node
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const x = scaleTime().range([0, width]);
    const y = scaleLinear().range([height, 0]);

    const valueline = line()
      .curve(d3.curveBasis)
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.close);
      });

    const data = Object.keys(rawData).map(symbol => {
      const values = [];
      rawData[symbol].forEach(week => {
        week.forEach(day => {
          values.push({ symbol, date: parseTime(day.date), close: day.close });
        });
      });
      return values;
    });

    const dates = data[0].map(d => d.date);

    x.domain(extent(dates, date => date));
    y.domain([0, max(data, company => max(company.map(v => v.close)))]);

    data.forEach(company => {
      g
        .append("path")
        .data([company])
        .style("stroke", colorHash.hex(company[0].symbol))
        .attr("class", "line")
        .attr("d", valueline);
    });

    g
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x))
      .select(".domain");

    g.append("g").call(axisLeft(y));
  }

  render() {
    return <svg ref={node => (this.graphNode = node)} />;
  }
}

export default ManyLineGraph;
