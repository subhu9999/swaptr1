import React from "react";
import "./Search.css";

export default function Search() {
  return (
    <div className="row no-gutters">
      <div className="col-4">
        <form className="form ml-3-md mr-1">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              placeholder="Location"
              style={{ borderRight: "none", height: "8vh" }}
            />

            <div
              className="input-group-append"
              style={{
                padding: "3px",
                paddingTop: "8px",
                background: "white",
                borderTopRightRadius: "15%",
                borderBottomRightRadius: "15%"
              }}
            >
              <i className="fa fa-map-marker fa-2x text-danger" />
            </div>
          </div>
        </form>
      </div>

      <div className="col-8">
        <form className="form">
          <div className="input-group search-width ">
            <input
              className="form-control"
              type="text"
              placeholder="Find Stuff To Swap"
              style={{ height: "8vh" }}
            />
            <div className="input-group-append">
              <button type="button" className="btn btn-light">
                <i className="fas fa-search text-dark" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
