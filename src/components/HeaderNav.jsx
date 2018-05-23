import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/HeaderNav.css";

class HeaderNav extends Component {
  render() {
    return (
      <div className="header-nav">
        <div className="nav-bar-content left">
          <Link to="/list">Trending Stocks</Link>
        </div>
        <Link to="/many/mostactive">
          <h1 className="nav-bar-content">the market app</h1>
        </Link>
        <div className="nav-bar-content right">
          <input
            className="header-input"
            type="text"
            placeholder="search by symbol"
          />
        </div>
      </div>
    );
  }
}

export default HeaderNav;
