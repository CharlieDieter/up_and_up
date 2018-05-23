import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import HeaderNav from "./HeaderNav";
import Legend from "./Legend";
import ManyLineGraph from "./ManyLineGraph";
import { getTopFive } from "../util/api_util.js";
import "../styles/Dashboard.css";

class Dashboard extends Component {
  state = {
    loading: true,
    batch: this.props.match.params.batch
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
    // TODO: update graph and fetch most active and biggest losers
    const dashboard = (
      <div>
        <HeaderNav />
        <h2>{`The five ${group} stocks of the last week`}</h2>
        <ManyLineGraph
          rawData={this.state.data}
          totalHeight={window.innerHeight - window.innerHeight / 100 * 50}
          totalWidth={window.innerWidth - window.innerWidth / 100 * 20}
          margin={{ top: 50, right: 20, bottom: 20, left: 50 }}
        />
        <Legend batch={this.state.batch} />
      </div>
    );

    const loading = <div>Loading...</div>;

    return this.state.loading ? loading : dashboard;
  }
}

export default withRouter(Dashboard);
