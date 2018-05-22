import React, { Component } from "react";
import { fetchMany } from "../util/api_util.js";

class Dashboard extends Component {
  componentDidMount() {
    fetchMany().then(result => console.log(result));
  }
  render() {
    return <div />;
  }
}

export default Dashboard;
