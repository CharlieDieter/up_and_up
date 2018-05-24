import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Legend from "./Legend";
import ManyLineGraph from "./ManyLineGraph";
import Loader from "./Loader";
import { getTopFive } from "../util/api_util.js";
import "../styles/Dashboard.css";

class Dashboard extends Component {
  state = {
    loading: true,
    batch: this.props.match.params.batch || "gainers"
  };

  componentDidMount() {
    getTopFive(this.state.batch).then(data =>
      this.setState({ loading: false, data })
    );
  }

  render() {
    const { batch } = this.state;

    const group =
      batch === "gainers"
        ? "highest performing"
        : batch === "mostactive" ? "most active" : "biggest losing";
    const dashboard = (
      <div>
        <h2>{`${group} stocks`}</h2>
        <ManyLineGraph
          rawData={this.state.data}
          totalHeight={window.innerHeight - window.innerHeight / 100 * 50}
          totalWidth={window.innerHeight * 1.3}
          margin={{ top: 50, right: 20, bottom: 20, left: 50 }}
        />
        <Legend batch={this.state.batch} />
      </div>
    );

    return this.state.loading ? <Loader /> : dashboard;
  }
}

export default withRouter(Dashboard);
