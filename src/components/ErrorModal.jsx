import React from "react";
import { withRouter } from "react-router-dom";
import "../styles/ErrorModal.css";

const ErrorModal = ({ error, close, history, location }) => {
  return (
    <div className="modal-background">
      <div className="modal">
        <h4 className="error-header">
          Whoops! We couldn't find that stock symbol
        </h4>
        <i className="material-icons modal-close-icon" onClick={close}>
          close
        </i>
        <h5>
          {location.pathname === "/list" ? (
            "Please enter another symbol, or choose one from the list"
          ) : (
            <div>
              If you need help, choose one from{" "}
              <div
                className="list-link"
                onClick={() => {
                  history.push("/list");
                  close();
                }}
              >
                this list
              </div>
            </div>
          )}
        </h5>
      </div>
    </div>
  );
};

export default withRouter(ErrorModal);
