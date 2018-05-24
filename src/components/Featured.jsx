import React, { Component } from "react";
import SingleLineGraph from "./SingleLineGraph";
import RangeList from "./RangeList";
import News from "./News";
import Loader from "./Loader";
import Legend from "./Legend";
import { fetchOne } from "../util/api_util.js";
import { withRouter } from "react-router-dom";
import "../styles/Featured.css";

class Featured extends Component {
  state = {
    loading: true,
    range: this.props.match.params.range,
    symbol: this.props.match.params.symbol,
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
    if (range !== this.state.range || symbol !== this.state.symbol) {
      fetchOne(symbol, range).then(data => {
        this.setState({ data: data[0], symbol, range });
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
          <Legend symbol={symbol} />
          <div className="featured-body">
            <SingleLineGraph
              data={this.state.data}
              totalHeight={Math.max(
                window.innerHeight - window.innerHeight / 100 * 50,
                200
              )}
              totalWidth={Math.max(
                window.innerWidth - window.innerWidth / 100 * 40,
                400
              )}
              margin={{ top: 20, right: 20, bottom: 30, left: 50 }}
              range={this.state.range}
            />
          </div>
          <RangeList symbol={symbol} range={range} />
        </div>
        <div className="news-container">
          <News data={news} />
        </div>
      </div>
    );

    return this.state.loading ? <Loader /> : featured;
  }
}

export default withRouter(Featured);
