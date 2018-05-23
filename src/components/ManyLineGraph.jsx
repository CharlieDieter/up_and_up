import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { parseTime } from "../util/d3_util";
import { scaleLinear, scaleTime } from "d3-scale";
import { line } from "d3-shape";
import { select } from "d3-selection";
import { axisBottom } from "d3-axis";
import { extent, max, min } from "d3-array";
import scheme from "../styles/scheme";
import * as d3 from "d3";
import "../styles/ManyLineGraph.css";

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

    const data = Object.keys(rawData).map(symbol => {
      const values = [];
      rawData[symbol].forEach(week => {
        const highest = max(week.map(day => day.close));

        week.forEach(day => {
          const avg = day.close / highest * 100;
          values.push({ symbol, date: parseTime(day.date), avg });
        });
      });
      return values;
    });

    const dates = data[0].map(d => d.date);

    const valueline = line()
      .curve(d3.curveBasis)
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.avg);
      });

    x.domain(extent(dates, date => date));
    y.domain([
      min(data, company => min(company.map(v => v.avg))),
      max(data, company => max(company.map(v => v.avg)))
    ]);
    data.forEach((company, idx) => {
      g
        .append("path")
        .data([company])
        .style("stroke", scheme[(idx * 2) % scheme.length])
        .attr("class", "line")
        .attr("d", valueline)
        .on("click", () =>
          this.props.history.push(`/featured/${company[0].symbol}/1m`)
        );
    });

    g
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(axisBottom(x))
      .select(".domain")
      .remove();
  }

  render() {
    return <svg ref={node => (this.graphNode = node)} />;
  }
}

export default withRouter(ManyLineGraph);
