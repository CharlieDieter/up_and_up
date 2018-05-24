import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getTopFiveSymbols, fetchDetails } from "../util/api_util.js";
import graphScheme from "../styles/scheme";
import "../styles/Legend.css";

class Legend extends Component {
  state = {
    symbols: [],
    loading: true
  };
  componentDidMount() {
    getTopFiveSymbols(this.props.batch).then(symbols =>
      fetchDetails(symbols).then(details =>
        this.setState({ symbols, details, loading: false })
      )
    );
  }
  render() {
    const legend = (
      <div className="legend">
        {this.state.symbols.map((s, idx) => {
          let {
            companyName,
            close,
            change,
            changePercent
          } = this.state.details[s][0].quote;

          const upArrow = <i className="material-icons">arrow_upward</i>;
          const downArrow = <i className="material-icons">arrow_downward</i>;

          const changePercentColor =
            changePercent < 0 ? "rgb(207, 61, 61)" : "rgb(52, 203, 117)";
          const changeColor =
            change < 0 ? "rgb(207, 61, 61)" : "rgb(52, 203, 117)";
          return (
            <div className="legend-details" key={`legend-${s}`}>
              <Link
                to={`/featured/${s}/1m`}
                style={{ color: graphScheme[(idx * 2) % graphScheme.length] }}
                className="legend-link"
              >
                <div className="legend-link-contents">
                  <div
                    style={{
                      background: graphScheme[(idx * 2) % graphScheme.length]
                    }}
                    className="legend-square"
                  >
                    h
                  </div>
                  <div className="legend-text">{s}</div>
                </div>
              </Link>
              <h5 className="legend-company-name">{companyName}</h5>
              <div className="legend-stats">
                <div className="close">{`$${close}`}</div>
                <div>
                  <div className="change" style={{ color: changeColor }}>
                    {change < 0 ? downArrow : upArrow}
                    {change}
                    <i />
                  </div>
                  <div
                    className="change-percent"
                    style={{ color: changePercentColor }}
                  >
                    {changePercent < 0 ? downArrow : upArrow}
                    {`(${Math.round(changePercent * 1000) / 100}%)`}
                    <i />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
    return this.state.loading ? <div>Loading details...</div> : legend;
  }
}

export default Legend;
