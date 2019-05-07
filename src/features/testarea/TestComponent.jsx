import React, { Component } from "react";
import Script from "react-load-script";
import Navbar from "../../app/layout/nav/Navbar/Navbar";
import "./TestComponent.css";
import Autocomplete from "./Autocomplete";

import { connect } from "react-redux";

const actions = {};
class TestComponent extends Component {
  state = {
    scriptLoaded: false
  };

  handleScriptLoad = () => {
    this.setState({
      scriptLoaded: true
    });
  };

  // handleFormSubmit = event => {
  //   event.preventDefault();

  //   geocodeByAddress(this.state.address)
  //     .then(results => getLatLng(results[0]))
  //     .then(latLng => console.log("Success", latLng))
  //     .catch(error => console.error("Error", error));
  // };
  render() {
    // const inputProps = {
    //   value: this.state.address,
    //   onChange: this.onChange
    // };
    return (
      <div>
        <Script
          url="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.1.2/mapbox-gl-geocoder.min.js"
          onLoad={this.handleScriptLoad}
        />

        <Navbar />
        <div className="" style={{ marginTop: "100px" }}>
          Test component
          {/* <form onSubmit={this.handleFormSubmit}>
            {this.state.scriptLoaded && <div id="map" />}
            <button type="submit">Submit</button>
          </form> */}
          <h1>React Autocomplete Demo</h1>
          <h2>Start typing and experience the autocomplete wizardry!</h2>
          <Autocomplete
            suggestions={[
              "Alligator",
              "Bask",
              "Crocodilian",
              "Death Roll",
              "Eggs",
              "Jaws",
              "Reptile",
              "Solitary",
              "Tail",
              "Wetlands"
            ]}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(TestComponent);
