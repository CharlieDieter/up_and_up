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
        ? "Highest Performing"
        : batch === "mostactive" ? "Most Active" : "Biggest Losing";
    const dashboard = (
      <div>
        <h2>{`Today's ${group} Stocks over the Last Week`}</h2>
        <ManyLineGraph
          rawData={this.state.data}
          totalHeight={Math.max(
            window.innerHeight - window.innerHeight / 100 * 50,
            300
          )}
          totalWidth={Math.max(window.innerHeight * 1.3, 600)}
          margin={{ top: 50, right: 20, bottom: 20, left: 50 }}
        />
        <Legend batch={this.state.batch} />
      </div>
    );

    return this.state.loading ? <Loader /> : dashboard;
  }
}

export default withRouter(Dashboard);
