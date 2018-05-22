import React, { Component } from "react";
import { fetchOne } from "../util/api_util.js";

class Featured extends Component {
  componentDidMount() {
    fetchOne();
  }
  render() {
    return <div />;
  }
}

export default Featured;
