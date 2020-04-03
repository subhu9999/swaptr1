import React, { Component } from "react";
import "./Search.css";
import AutoCompleteLocation from './AutoCompleteLocation';
// import LocationInputSearch from "./LocationInputSearch";
// import ProductInputSearch from "./ProductInputSearch";
import { reduxForm
  // , Field 
} from "redux-form";
import { connect } from "react-redux";
// import { isRequired, combineValidators } from "revalidate";
import { withRouter } from "react-router-dom";
import AutoCompleteText from "./AutoCompleteText";
import keywords from "./SearchKeywords";
const mapState = state => {
  let searchInputs = {};

  return {
    initialValues: searchInputs
  };
};

// const validate = combineValidators({
//   city: isRequired({ message: "Location is important" })
// });

class Search extends Component {
  componentDidMount = () => {
    let cityValue = this.props.cityValue;
    if (cityValue) {
      this.props.initialize({
        city: cityValue
      });
    }
  };
  onLocationSelect = value => {
    // console.log("selected");

    this.props.initialize({
      city: value
    });

    this.props.history.push(`/search/${value}`);
  };

  searchSuggestion = value => {
    // console.log("selected");

    this.props.history.push(`/search/${value}`);
  };

  render() {
    const { searchSuggestion } = this;
    return (
      <div className="row no-gutters">
        <div className="col-3 col-md-3 location-search">
          <AutoCompleteLocation 
          keywords={keywords}
          searchSuggestion={searchSuggestion}
          />
          {/* <form className="form ml-3-md mr-1">
            <Field
              name="city"
              type="text"
              component={LocationInputSearch}
              options={{
                types: ["(regions)"],
                componentRestrictions: { country: "in" }
              }}
              placeholder="Enter Location"
              onSelect={this.onLocationSelect}
            />
          </form> */}
          
        </div>
        <div className="col-1 col-md-1">
          <div className="location-input-marker rounded-0">
            <i className="fa fa-map-marker-alt fa-2x text-danger" />
          </div>
        </div>
        <div className="col-12 col-md-8">
          <AutoCompleteText
            keywords={keywords}
            searchSuggestion={searchSuggestion}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(mapState)(
    reduxForm({
      form: "searchForm",
      enableReinitialize: true,
      keepDirtyOnReinitialize: true
      // validate
    })(Search)
  )
);
