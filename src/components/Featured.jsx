import React, { Component } from "react";
import SingleLineGraph from "./SingleLineGraph";
import RangeList from "./RangeList";
import News from "./News";
import { fetchOne } from "../util/api_util.js";
import { withRouter } from "react-router-dom";
import "../styles/Featured.css";

class Featured extends Component {
  state = {
    loading: true,
    range: this.props.match.params.range,
    data: {
      quote: {
        comapnyName: ""
      }
    }
  };

  componentDidMount() {
    const { symbol, range } = this.props.match.params;
    fetchOne(symbol, range).then(data => {
      this.setState({ data: data[0], loading: false });
    });
  }

  componentDidUpdate() {
    const { symbol, range } = this.props.match.params;
    if (range !== this.state.range) {
      fetchOne(symbol, range).then(data => {
        this.setState({ data: data[0], range });
      });
    }
  }

  render() {
    const { symbol } = this.props.match.params;
    const { companyName } = this.state.data.quote;
    const { news } = this.state.data;
    const { range } = this.state;
    const rangeDescription =
      range === "1m"
        ? "month"
        : range === "3m"
          ? "three months"
          : range === "6m"
            ? "six months"
            : range === "1y"
              ? "year"
              : range === "2y"
                ? "two years"
                : range === "ytd" ? "year to date" : "five years";
    const featured = (
      <div className="featured">
        <div className="featured-left">
          <h2 className="featured-header">
            {companyName} over the last {rangeDescription}
          </h2>
          <div className="featured-body">
            <SingleLineGraph
              data={this.state.data}
              totalHeight={window.innerHeight - window.innerHeight / 100 * 40}
              totalWidth={window.innerWidth - window.innerWidth / 100 * 30}
              margin={{ top: 20, right: 20, bottom: 30, left: 50 }}
              range={this.state.range}
            />
            <RangeList symbol={symbol} range={range} />
          </div>
        </div>
        <div className="news-container">
          <News data={news} />
        </div>
      </div>
    );

    const loading = <div>Loading...</div>;

    return this.state.loading ? loading : featured;
  }
}

export default withRouter(Featured);
