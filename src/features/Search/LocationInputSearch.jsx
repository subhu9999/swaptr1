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

class LocationInputSearch extends Component {
  state = {
    scriptLoaded: false
  };
  handleScriptLoaded = () =>
    this.setState({
      scriptLoaded: true
    });
  render() {
    const { input, type, placeholder, onSelect, options } = this.props;
    // console.log(onSelect);
    return (
      <div className="form-group mb-0">
        <Script url={scriptUrl} onLoad={this.handleScriptLoaded} />

        {this.state.scriptLoaded && (
          <PlacesAutocomplete
            inputProps={{ ...input, placeholder }}
            options={options}
            onSelect={value => {
              onSelect(value);
            }}
            classNames={{
              input: "form-control rounded-0 location-input"
            }}
            type={type}
            styles={styles}
          />
        )}
      </div>
    );
  }
}

export default LocationInputSearch;

