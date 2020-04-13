import React from "react";
import "./Banner.css";

export default function Banner() {
  // return <div className="container-fluid banner" />;
  return (
    <div className='d-flex row banner-large justify-content-center'>
      <img src={'/assets/swaptr-banner.png'} className='hide-banner' alt='a'/>
      <img
            src={"/assets/mobile-banner.png"}
            alt="b"
            className="banner-small"
          />
    </div>
  )
}
