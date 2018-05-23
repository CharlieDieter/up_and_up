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
          const {
            companyName,
            close,
            change,
            changePercent
          } = this.state.details[s][0].quote;

          return (
            <div className="legend-details" key={`legend-${s}`}>
              <Link
                to={`/featured/${s}/1m`}
                style={{ color: graphScheme[(idx * 2) % graphScheme.length] }}
                className="legend-link"
              >
                <div
                  style={{
                    background: graphScheme[(idx * 2) % graphScheme.length]
                  }}
                  className="legend-square"
                >
                  h
                </div>
                <div className="legend-text">{s}</div>
              </Link>
              <h3 />
            </div>
          );
        })}
      </div>
    );
    return this.state.loading ? <div>Loading details...</div> : legend;
  }
}

export default Legend;
