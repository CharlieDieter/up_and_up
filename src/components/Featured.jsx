import React, { Component } from "react";
import HeaderNav from "./HeaderNav";
import SingleLineGraph from "./SingleLineGraph";
import RangeList from "./RangeList";
import { fetchOne } from "../util/api_util.js";
import { withRouter } from "react-router-dom";

class Featured extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    const { symbol, range } = this.props.match.params;

    fetchOne(symbol, range).then(data => {
      this.setState({ data: data[0], loading: false });
    });
  }

  render() {
    const { symbol } = this.props.match.params;
    const featured = (
      <div>
        <HeaderNav />
        <SingleLineGraph
          data={this.state.data}
          totalHeight={600}
          totalWidth={960}
          margin={{ top: 20, right: 20, bottom: 30, left: 50 }}
        />
        <RangeList symbol={symbol} />
      </div>
    );

    const loading = <div>Loading...</div>;

    return this.state.loading ? loading : featured;
  }
}

export default withRouter(Featured);
