import React from "react";
import "./LoadingComponent.css";
import "./LoadingComponent.scss";
import { Spinner } from "react-bootstrap";
const LoadingComponent = () => {
  // return (
  //   <div className="d-flex justify-content-center loading-div">
  //     <div
  //       className="spinner-border text-primary mt-md-3 "
  //       role="status"
  //       style={{ width: "3rem", height: "3rem" }}
  //     >
  //       <span className="sr-only">Loading...</span>
  //     </div>
  //   </div>
  // );

  return (
    // <main className="page">
    //   <h1 className="page-title"></h1>

    //   <div className="page-content">
    //     <div className="placeholder-content">
    //       <div className="placeholder-content_item"></div>
    //       <div className="placeholder-content_item"></div>
    //       <div className="placeholder-content_item"></div>
    //       <div className="placeholder-content_item"></div>
    //       <div className="placeholder-content_item"></div>
    //       <div className="placeholder-content_item"></div>
    //       <div className="placeholder-content_item"></div>
    //       <div className="placeholder-content_item"></div>
    //       <div className="placeholder-content_item"></div>
    //       <div className="placeholder-content_item"></div>
    //       <div className="placeholder-content_item"></div>
    //     </div>
    //   </div>
    // </main>

    <div className='d-flex justify-content-center'>
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="primary" />
    </div>
  );
};

// const LoadingComponent = () => {
//   return <div className="nb-spinner" />;
// };

export default LoadingComponent;
