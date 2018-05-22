import React, { Component } from "react";
import HeaderNav from "./HeaderNav";
import LineGraph from "./LineGraph";
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
        <LineGraph data={this.state.data} />
      </div>
    );

    const loading = <div>Loading...</div>;

    return this.state.loading ? loading : dashboard;
  }
}

export default Dashboard;
