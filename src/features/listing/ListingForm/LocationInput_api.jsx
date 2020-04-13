import React, { Component } from "react";
import Script from "react-load-script";
import PlacesAutocomplete from "react-places-autocomplete";

const LOCATION_API_KEY = process.env.REACT_APP_LOCATION_API_KEY;
const scriptUrl =
  "https://maps.googleapis.com/maps/api/js?key=" +
  LOCATION_API_KEY +
  "&libraries=places";

const styles = {
  autocompleteContainer: {
    zIndex: 1000
  }
};

class LocationInput extends Component {
  state = {
    scriptLoaded: false
  };
  handleScriptLoaded = () =>
    this.setState({
      scriptLoaded: true
    });
  render() {
    const {
      input,
      type,
      placeholder,
      onSelect,
      options,
      meta: { touched, error }
    } = this.props;
    return (
      <div className="form-group ml-md-4">
        <Script url={scriptUrl} onLoad={this.handleScriptLoaded} />
        <label className="listing-form-label ">
          <span className="text-muted">
            <i className="fas fa-map-marker-alt fa-lg mr-1" />
            Location*
          </span>
          {this.state.scriptLoaded && (
            <PlacesAutocomplete
              inputProps={{ ...input }}
              options={options}
              onSelect={onSelect}
              classNames={{
                input:
                  "form-control listing-form-input " +
                  (touched && error
                    ? "form-control listing-form-input border-danger"
                    : "")
              }}
              type={type}
              styles={styles}
              placeholder={placeholder}
            />
          )}
        </label>
        {touched && error && <label className="text-danger ">{error}</label>}
      </div>
    );
  }
}

export default LocationInput;
