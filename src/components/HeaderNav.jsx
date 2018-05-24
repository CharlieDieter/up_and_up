import React, { Component } from "react";
import { Link } from "react-router-dom";
import StockSearch from "./StockSearch";
import "../styles/HeaderNav.css";

class HeaderNav extends Component {
  render() {
    return (
      <div className="header-nav">
        <div className="nav-bar-content left">
          <StockSearch />
        </div>
        <Link to="/many/mostactive">
          <h1 className="nav-bar-content">up and up</h1>
        </Link>
        <div className="nav-bar-content right">
          <Link to="/list">Trending Stocks</Link>
        </div>
      </div>
    );
  }
}

export default HeaderNav;
