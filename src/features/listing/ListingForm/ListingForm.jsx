import React, { Component } from "react";
import "./ListingForm.css";
import Banner from "../../../app/layout/Banner/Banner";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan
} from "revalidate";
import { createListing, updateListing } from "../listingActions";
import cuid from "cuid";
import AdTitleInput from "./AdTitleInput";
import LocationInput from "./LocationInput";
import DescriptionInput from "./DescriptionInput";
import NavbarAlt from "../../../app/layout/nav/Navbar/NavbarAlt";
import NameInput from "./NameInput";
import PhoneInput from "./PhoneInput";
import ShowNumberToggle from "./ShowNumberToggle";
import SelectInput from "./SelectInput";

const mapState = (state, ownProps) => {
  const listingId = ownProps.match.params.id;

  let listing = {};

  if (listingId && state.listings.length > 0) {
    listing = state.listings.filter(listing => listing.id === listingId)[0];
  }

  return {
    initialValues: listing
  };
};

const actions = {
  createListing,
  updateListing
};

const validate = combineValidators({
  title: composeValidators(
    isRequired({ message: "The listing title is required" }),
    hasLengthGreaterThan(7)({
      message: "Title needs to be atleast 8 characters"
    })
  )(),
  city: isRequired({ message: "Location is important" }),
  userName: isRequired({ message: "Lets us confirm your name !" })
});

class ListingForm extends Component {
  state = {
    showNumber: true
  };

  onFormSubmit = values => {
    if (this.props.initialValues.id) {
      this.props.updateListing(values);
      this.props.history.goBack();
    } else {
      const newListing = {
        ...values,
        id: cuid(),
        listingMainPhoto: "/assets/swaptr-listing.jpg"
      };
      this.props.createListing(newListing);
      this.props.history.push("/");
    }
  };

  toggleShowNumber = () => {
    this.setState({
      showNumber: !this.state.showNumber
    });
  };

  // while updating update date also
  render() {
    const { invalid, submitting, pristine } = this.props;

    return (
      <div>
        <NavbarAlt />
        <Banner />
        <div className="row">
          <div className="col-md-2" />
          <div className="col-12 col-md-8 ">
            <form
              className="listing-form border "
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
            >
              <h3 className="display-4 text-center mb-4">Post Your Ad</h3>

              <Field name="title" type="text" component={AdTitleInput} />

              <Field name="category" type="text" component={SelectInput} />

              <Field
                name="city"
                type="text"
                component={LocationInput}
                options={{
                  types: ["(regions)"],
                  componentRestrictions: { country: "in" }
                }}
                placeholder=""
              />
              <Field
                name="description"
                type="text"
                component={DescriptionInput}
              />

              <div className="card border rounded-0">
                <div className="card-header h5 text-secondary">
                  Contact Details
                </div>
                <div className="card-body ">
                  <Field name="userName" type="text" component={NameInput} />
                  {this.state.showNumber && <PhoneInput />}
                  <ShowNumberToggle
                    defaultChecked={this.state.showNumber}
                    onChange={this.toggleShowNumber}
                  />
                </div>
                <div className="card-footer text-muted text-center">
                  <div className="form-group">
                    <button
                      disabled={invalid || submitting || pristine}
                      type="submit"
                      className="btn btn-primary btn-lg  rounded-0"
                    >
                      Post Now
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(
  reduxForm({ form: "listingForm", enableReinitialize: true, validate })(
    ListingForm
  )
);
