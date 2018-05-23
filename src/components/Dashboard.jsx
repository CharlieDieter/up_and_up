import React, { Component } from "react";
import HeaderNav from "./HeaderNav";
import ManyLineGraph from "./ManyLineGraph";
import { fetchMany } from "../util/api_util.js";

class Dashboard extends Component {
  state = {
    loading: true
  };
  componentDidMount() {
    fetchMany().then(data => this.setState({ loading: false, data }));
  }
  render() {
    const dashboard = (
      <div>
        <HeaderNav />
        <ManyLineGraph
          rawData={this.state.data}
          totalHeight={window.innerHeight - window.innerHeight / 100 * 20}
          totalWidth={window.innerWidth - window.innerWidth / 100 * 20}
          margin={{ top: 100, right: 20, bottom: 30, left: 50 }}
        />
      </div>
    );

    const loading = <div>Loading...</div>;

    return this.state.loading ? loading : dashboard;
  }
}

export default Dashboard;
