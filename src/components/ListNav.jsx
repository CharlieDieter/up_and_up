import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getTopFiveSymbols } from "../util/api_util";
import "../styles/ListNav.css";

class ListNav extends Component {
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
      <div className="list-nav">
        <h3>Most active this week:</h3>
        {this.state.active.map(s => (
          <li key={`${s}`}>
            <Link to={`/featured/${s}/1m`}>{s}</Link>
          </li>
        ))}
        <h3>Highest gainers:</h3>
        {this.state.gainers.map(s => (
          <li key={`${s}`}>
            <Link to={`/featured/${s}/1m`}>{s}</Link>
          </li>
        ))}
        <h3>Biggest Losers:</h3>
        {this.state.losers.map(s => (
          <li key={`${s}`}>
            <Link to={`/featured/${s}/1m`}>{s}</Link>
          </li>
        ))}
      </div>
    );
  }
}

export default ListNav;
