import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/HeaderNav.css";

class HeaderNav extends Component {
  render() {
    return (
      <div className="header-nav">
        <div className="nav-bar-content left">hi</div>
        <Link to="/">
          <h2 className="nav-bar-content">the market app</h2>
        </Link>
        <div className="nav-bar-content right">
          <Link to="/">hi</Link>
        </div>
      </div>
    );
  }
}

export default HeaderNav;
