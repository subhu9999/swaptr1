import React from "react";
import "./LoadingComponent.css";

const LoadingComponent = () => {
  return (
    <div className="d-flex justify-content-center loading-div">
      <div
        className="spinner-border text-primary mt-md-3 "
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

// const LoadingComponent = () => {
//   return <div className="nb-spinner" />;
// };

export default LoadingComponent;
