import React, { Component } from "react";
import HeaderNav from "./HeaderNav";
import { Link } from "react-router-dom";
import { getTopFiveSymbols } from "../util/api_util";
import "../styles/StockList.css";

class StockList extends Component {
  state = {
    gainers: [],
    active: [],
    losers: []
  };

  componentDidMount() {
    getTopFiveSymbols("gainers").then(gainers => this.setState({ gainers }));
    getTopFiveSymbols("mostactive").then(active => this.setState({ active }));
    getTopFiveSymbols("losers").then(losers => this.setState({ losers }));
  }

  render() {
    return (
      <div>
        <HeaderNav />
        <div className="list-nav">
          <h3>
            <Link to="/many/mostactive">Most active this week</Link>
          </h3>
          {this.state.active.map(s => (
            <li key={`${s}`}>
              <Link to={`/featured/${s}/1m`}>{s}</Link>
            </li>
          ))}
          <h3>
            <Link to="/many/gainers">Highest gainers</Link>
          </h3>
          {this.state.gainers.map(s => (
            <li key={`${s}`}>
              <Link to={`/featured/${s}/1m`}>{s}</Link>
            </li>
          ))}
          <h3>
            <Link to="/many/losers">Biggest Losers</Link>
          </h3>
          {this.state.losers.map(s => (
            <li key={`${s}`}>
              <Link to={`/featured/${s}/1m`}>{s}</Link>
            </li>
          ))}
        </div>
      </div>
    );
  }
}

export default StockList;
