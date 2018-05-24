import React, { Component } from "react";
import ErrorModal from "./ErrorModal";
import { withRouter } from "react-router-dom";
import { fetchOne } from "../util/api_util";

class StockSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      val: "",
      error: false
    };
  }

  updateVal = e => {
    e.preventDefault();
    this.setState({ val: e.target.value });
  };

  closeModal = () => {
    this.setState({ error: false, val: "" });
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
      .catch(error => {
        return this.setState({ error });
      });
  };

  render() {
    const { error } = this.state;
    return !this.props.match.params.range ? (
      <form onSubmit={this.handleSubmit}>
        {error && <ErrorModal error={error} close={this.closeModal} />}
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
