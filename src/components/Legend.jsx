import React, { Component } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { getTopFiveSymbols, fetchDetails } from "../util/api_util.js";
import graphScheme from "../styles/scheme";
import ColorHash from "color-hash";
import { CSSTransitionGroup } from "react-transition-group";
import "../styles/Legend.css";

class Legend extends Component {
  state = {
    symbols: [],
    loading: true
  };
  componentDidMount() {
    if (this.props.batch) {
      getTopFiveSymbols(this.props.batch).then(symbols =>
        fetchDetails(symbols).then(details =>
          this.setState({ symbols, details, loading: false })
        )
      );
    } else if (this.props.symbol) {
      fetchDetails([this.props.symbol]).then(details =>
        this.setState({ symbols: [this.props.symbol], details, loading: false })
      );
    }
    this.colorHash = new ColorHash();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.symbol && this.props.symbol !== nextProps.symbol) {
      this.setState({ loading: true }, () =>
        fetchDetails([nextProps.symbol]).then(details =>
          this.setState({
            symbols: [nextProps.symbol],
            details,
            loading: false
          })
        )
      );
    }
  }
  render() {
    const flexOnFeatured = this.props.symbol
      ? {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: " 50%"
        }
      : {};

    const legend = (
      <CSSTransitionGroup
        transitionName="loading"
        transitionAppear={true}
        transitionAppearTimeout={500}
      >
        <div className="legend">
          {this.state.symbols.map((s, idx) => {
            let {
              companyName,
              close,
              change,
              changePercent
            } = this.state.details[s][0].quote;

            const colorOnFeatured = this.props.symbol
              ? this.colorHash.hex(this.props.symbol.toLowerCase())
              : graphScheme[(idx * 2) % graphScheme.length];

            const upArrow = <i className="material-icons">arrow_upward</i>;
            const downArrow = <i className="material-icons">arrow_downward</i>;

            const changePercentColor =
              changePercent < 0 ? "rgb(207, 61, 61)" : "rgb(52, 203, 117)";
            const changeColor =
              change < 0 ? "rgb(207, 61, 61)" : "rgb(52, 203, 117)";
            return (
              <div
                className="legend-details"
                key={`legend-${s}`}
                style={flexOnFeatured}
              >
                <div>
                  <Link
                    to={`/featured/${s}/1m`}
                    style={{ color: colorOnFeatured }}
                    className="legend-link"
                  >
                    <div className="legend-link-contents">
                      <div
                        style={{
                          background: colorOnFeatured
                        }}
                        className="legend-square"
                      >
                        h
                      </div>
                      <div className="legend-text">{s}</div>
                    </div>
                  </Link>
                  <h5 className="legend-company-name">
                    {!this.props.symbol && companyName}
                  </h5>
                </div>
                <div className="legend-stats">
                  <div className="currently" />
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
      </CSSTransitionGroup>
    );
    return this.state.loading ? <Loader /> : legend;
  }
}

export default Legend;
