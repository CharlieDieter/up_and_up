import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { fetchOne } from "../util/api_util";

class StockSearch extends Component {
  state = {
    val: ""
  };

  updateVal = e => {
    e.preventDefault();
    this.setState({ val: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    fetchOne(this.state.val)
      .then(() => {
        const { val } = this.state;
        this.setState(
          { val: "" },
          this.props.history.push(`/featured/${val}/1m`)
        );
      })
      .catch(err => alert("Sorry! We couldn't find that one."));
  };

  render() {
    return !this.props.match.params.range ? (
      <form onSubmit={this.handleSubmit}>
        <input
          className="header-input"
          type="text"
          placeholder="search by symbol"
          value={this.state.val}
          onChange={this.updateVal}
        />
      </form>
    ) : (
      <div className="nav-bar-content right">
        <div style={{ color: "#666c84" }}>Trending Stocks</div>
      </div>
    );
  }
}

export default withRouter(StockSearch);
