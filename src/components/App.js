import React, { Component } from "react";
import Dashboard from "./Dashboard";
import StockList from "./StockList";
import Featured from "./Featured";
import HeaderNav from "./HeaderNav";
import "../styles/App.css";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderNav />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/many/:batch" component={Dashboard} />
        <Route exact path="/list" component={StockList} />
        <Route exact path="/featured/:symbol/:range" component={Featured} />
      </div>
    );
  }
}

export default App;
