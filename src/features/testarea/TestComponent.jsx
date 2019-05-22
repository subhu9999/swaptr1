import React, { Component } from "react";
import Script from "react-load-script";
import Navbar from "../../app/layout/nav/Navbar/Navbar";
import "./TestComponent.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import { connect } from "react-redux";
import { openModal } from "../modals/modalActions";
import { Button } from "react-bootstrap";

const LOCATION_API_KEY = process.env.REACT_APP_LOCATION_API_KEY;

const scriptUrl =
  "https://maps.googleapis.com/maps/api/js?key=" +
  LOCATION_API_KEY +
  "&libraries=places";

const actions = {
  openModal
};

class TestComponent extends Component {
  state = {
    address: "",
    scriptLoaded: false
  };

  handleScriptLoad = () => {
    this.setState({
      scriptLoaded: true
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log("Success", latLng))
      .catch(error => console.error("Error", error));
  };

  onChange = address => this.setState({ address });
  render() {
    const { openModal } = this.props;
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };
    return (
      <div>
        <Script url={scriptUrl} onLoad={this.handleScriptLoaded} />

        <Navbar />
        <div className="" style={{ marginTop: "100px" }}>
          Test component
          <form onSubmit={this.handleFormSubmit}>
            {this.state.scriptLoaded && (
              <PlacesAutocomplete inputProps={inputProps} />
            )}
            <button type="submit">Submit</button>
          </form>
        </div>
        <Button
          variant="info"
          onClick={() => openModal("TestModal", { data: 44 })}
        >
          modal
        </Button>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(TestComponent);
