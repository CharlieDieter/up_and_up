import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { parseTime } from "../util/d3_util";
import { scaleLinear, scaleTime } from "d3-scale";
import { line, curveBasis } from "d3-shape";
import { select } from "d3-selection";
import { transition } from "d3-transition";
import { axisLeft, axisBottom } from "d3-axis";
import { extent, max, min } from "d3-array";
import graphScheme from "../styles/scheme";
import "../styles/ManyLineGraph.css";

class ManyLineGraph extends Component {
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
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

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
      .curve(curveBasis)
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
        .style("stroke", graphScheme[(idx * 2) % graphScheme.length])
        .attr("class", "line")
        .attr("d", valueline)
        .on("click", () =>
          this.props.history.push(`/featured/${company[0].symbol}/1m`)
        )
        .on("mouseover", () => {
          select(`.${company[0].symbol}-label`)
            .transition()
            .duration(300)
            .style("font-size", "50px")
            .style("opacity", 1);
        })
        .on("mouseleave", () => {
          select(`.${company[0].symbol}-label`)
            .transition()
            .duration(300)
            .style("font-size", "10px")
            .style("opacity", 0.4);
        });

      g
        .append("text")
        .attr(
          "transform",
          "translate(" + (width + 3) + "," + y(company[0].avg) + ")"
        )
        .attr("class", `${company[0].symbol}-label`)
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("font-size", "10px")
        .style("opacity", 0.4)
        .style("fill", graphScheme[(idx * 2) % graphScheme.length])
        .text(company[0].symbol)
        .style("cursor", "pointer")
        .on("mouseover", () => {
          select(`.${company[0].symbol}-label`)
            .transition()
            .duration(300)
            .style("font-size", "30px")
            .style("opacity", 1);
        })
        .on("mouseleave", () => {
          select(`.${company[0].symbol}-label`)
            .transition()
            .duration(300)

            .style("font-size", "10px")
            .style("opacity", 0.4);
        })
        .on("click", () =>
          this.props.history.push(`/featured/${company[0].symbol}/1m`)
        );
    });

    g
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(axisBottom(x))
      .select(".domain")
      .remove();

    g
      .append("g")
      .call(axisLeft(y))
      .attr("class", "y-axis")
      .select(".domain");

    g
      .append("g")
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("x", -6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("% of weekly high");
  }

  render() {
    return <svg className="graph" ref={node => (this.graphNode = node)} />;
  }
}

export default withRouter(ManyLineGraph);
