import React, { Component } from "react";

import { Link } from "react-router-dom";
import * as d3 from "d3";

class StockList extends Component {
  state = {
    symbols: []
  };
  componentDidMount() {
    let symbols = [];
    d3
      .csv("symbols.csv", data => {
        symbols.push(data.symbol);
      })
      .then(() => this.setState({ symbols }));
  }

  render() {
    return (
      <div>
        {this.state.symbols.map(s => (
          <li key={`${s}`}>
            <Link to={`/featured/${s}/1m`}>{s}</Link>
          </li>
        ))}
      </div>
    );
  }
}

export default StockList;
