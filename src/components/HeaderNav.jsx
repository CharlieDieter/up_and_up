import React from "react";
import { Link, withRouter } from "react-router-dom";
import StockSearch from "./StockSearch";
import "../styles/HeaderNav.css";

const HeaderNav = ({ location }) => {
  return (
    <div className="header-nav">
      <div className="nav-bar-content left">
        <StockSearch />
      </div>
      <Link to="/many/mostactive">
        <h1 className="nav-bar-content">up and up</h1>
      </Link>
      <div className="nav-bar-content right">
        {location.pathname !== "/list" ? (
          <Link to="/list">Trending Stocks</Link>
        ) : null}
      </div>
    </div>
  );
};

export default withRouter(HeaderNav);
