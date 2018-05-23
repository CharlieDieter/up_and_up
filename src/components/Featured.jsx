import React, { Component } from "react";
import HeaderNav from "./HeaderNav";
import SingleLineGraph from "./SingleLineGraph";
import RangeList from "./RangeList";
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
    const { range } = this.state;

    const featured = (
      <div>
        <HeaderNav />
        <h2>{companyName}</h2>
        <h4>over the last {range}</h4>
        <div className="featured-body">
          <SingleLineGraph
            data={this.state.data}
            totalHeight={window.innerHeight - window.innerHeight / 100 * 40}
            totalWidth={window.innerWidth - window.innerWidth / 100 * 40}
            margin={{ top: 20, right: 20, bottom: 30, left: 50 }}
            range={this.state.range}
          />
          <RangeList symbol={symbol} range={range} />
        </div>
      </div>
    );

    const loading = <div>Loading...</div>;

    return this.state.loading ? loading : featured;
  }
}

export default withRouter(Featured);
