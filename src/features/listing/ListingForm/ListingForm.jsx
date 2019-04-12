import React, { Component } from "react";
import "./ListingForm.css";
import Banner from "../../../app/layout/Banner/Banner";

class ListingForm extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-light nav-background fixed-top ">
          <a href="/" className="navbar-brand ">
            <i className="fas fa-arrow-left text-light mr-2" />

            <span className="text-light ml-1">Swaptr</span>
          </a>
        </nav>
        <Banner />
        <div className="row">
          <div className="col-12">
            <h3 className="display-4 text-center ">Post Your Ad</h3>
            <form className="listing-form text-center">
              <div className="form-group ">
                <label className="listing-form-label">
                  <input
                    placeholder=" "
                    type="text"
                    className="form-control listing-form-input"
                  />
                  <span className="listing-form-span">Ad Title*</span>
                </label>
              </div>
              <div className="form-group ">
                <label className="listing-form-label">
                  <input
                    placeholder=" "
                    type="text"
                    className="form-control listing-form-input"
                  />
                  <span className="listing-form-span">Description*</span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ListingForm;
