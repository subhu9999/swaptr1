import React, { Component } from "react";
import Script from "react-load-script";
import Navbar from "../../app/layout/nav/Navbar/Navbar";
// import format from "date-fns/format";

import "./TestComponent.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-places-autocomplete";

import { connect } from "react-redux";
import { openModal } from "../modals/modalActions";
import { Button } from "react-bootstrap";
import Dropzone from "react-dropzone";
// import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { uploadProfileImage } from "../user/userActions";
import { toastr } from "react-redux-toastr";
import cuid from "cuid";
// import {
  // InstantSearch,
  // SearchBox,
  // Hits,
  // Highlight
// } from "react-instantsearch-dom";
// import { Link } from "react-router-dom";
import AutoCompleteText from '../search/AutoCompleteText';
const LOCATION_API_KEY = process.env.REACT_APP_LOCATION_API_KEY;

const scriptUrl =
  "https://maps.googleapis.com/maps/api/js?key=" +
  LOCATION_API_KEY +
  "&libraries=places";

const actions = {
  openModal,
  uploadProfileImage
  // uploadTest
};

// const Hit = ({ hit }) => (
  // <Link to={`/listing/${hit.id}`}>
  //   <div className="hit">
  //     <div className="hit-image">
  //       <img src={hit.images[0].imageURL} alt="listing_image"></img>
  //     </div>
  //     <div className="hit-content">
  //       <div className="hit-price">${hit.title}</div>
  //       <div className="hit-name">
  //         <Highlight attribute="description" hit={hit} />
  //       </div>
  //     </div>
  //   </div>
  // </Link>
//   <Link to={`/listing/${hit.id}`}>
//     <img
//       src={hit.images[0].imageURL || `/assets/swaptr-listing.jpg`}
//       alt="img"
//       className="hit-image"
//     />
//     <h6 className="ml-1 listing-title">{hit.title}</h6>

//     <div className="ml-1 text-secondary text-uppercase text-location-date">
//       {hit.city}
//       <span className="text-muted mr-1 display-none" style={{ float: "right" }}>
//         {format(hit.created, "MMM DD")}
//       </span>
//     </div>
//   </Link>
// );

// const Sidebar = () => <div id="left-column"></div>;

// const Content = () => (
//   <div id="right-column" className="">
//     <div className="mt-4 ">
//       <Hits hitComponent={Hit}></Hits>
//     </div>
//   </div>
// );
class TestComponent extends Component {
  state = {
    address: "",
    scriptLoaded: false,
    files: [],
    tempImages: [],
    cropResult: null,
    image: {},
    maxImages: 8
  };

  uploadImage = async () => {
    try {
      await this.props.uploadProfileImage(this.state.image);
      this.cancelCrop();
      toastr.success("success", "photo has been uploaded");
    } catch (error) {
      toastr.error("oops", error.message);
    }
  };

  uploadImageTest = async () => {
    try {
      await this.props.uploadTest(this.state.files[0]);
      this.cancelCrop();
      toastr.success("success", "photo has been uploaded");
    } catch (error) {
      toastr.error("oops", error.message);
    }
  };

  cancelCrop = () => {
    this.setState({
      files: [],
      image: {}
    });
  };

  cropImage = () => {
    if (typeof this.refs.cropper.getCroppedCanvas() === "undefined") {
      return;
    }

    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      let imageUrl = URL.createObjectURL(blob);
      this.setState({
        cropResult: imageUrl,
        image: blob
      });
    }, "image/jpeg");
  };

  onDrop = currentFiles => {
    this.setState(prevState => ({
      files: [...prevState.files, ...currentFiles],
      tempImages: []
    }));

    //TODO: state remaining images - pass through onDrop
    //check files length in total
    if (this.state.files.length > this.state.maxImages) {
      toastr.warning("error", "Only 8 images allowed !");
      const sliceFiles = [...this.state.files].slice(0, this.state.maxImages);
      this.setState({
        files: [...sliceFiles],
        tempImages: []
      });
    }

    this.state.files.forEach(file => {
      const myFileItemReader = new FileReader();
      myFileItemReader.addEventListener(
        "load",
        () => {
          // console.log(myFileItemReader.result);
          this.setState(prevState => ({
            tempImages: [...prevState.tempImages, myFileItemReader.result]
          }));
        },
        false
      );
      myFileItemReader.readAsDataURL(file);
    });
  };

  deleteSelection = selectedImage => {
    // toastr.success("deleted", "1 photo deleted !");
    // console.log(selectedImage);
    //delete selected image from files
    //delete selected image from tempImages
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
    const { tempImages } = this.state;
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };

    return (
      <div>
        <Script url={scriptUrl} onLoad={this.handleScriptLoaded} />

        <Navbar />
        <div className="" style={{ marginTop: "100px" }}>
          <AutoCompleteText />
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

        <div>
          <h2>Add Photos</h2>
          <div className="container row no-gutters">
            <div className="col-md-2">
              <Dropzone
                onDrop={files => this.onDrop(files)}
                multiple={true}
                accept="image/jpeg, image/png"
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()} className="dropzone">
                      <input {...getInputProps()} />

                      <i className=" fas fa-camera fa-3x m-2" />
                      <span className="m-2">Upload Photos</span>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            {tempImages &&
              tempImages.length > 0 &&
              tempImages.map((image, index) => (
                <div className="col-md-2 margin-custom" key={image + cuid()}>
                  <img
                    alt=""
                    src={image}
                    className="img-fluid img-thumbnail-test "
                  />
                  <button
                    onClick={this.deleteSelection.bind(this, index)}
                    className="btn btn-danger btn-photo-delete"
                  >
                    x
                  </button>
                </div>
              ))}
            <div className="container">
              <span>Step 3 - Preview and Upload</span>

              <div
                className="btn-group"
                role="group"
                aria-label="preview buttons"
              >
                <button
                  onClick={this.uploadImage}
                  type="button"
                  className="btn btn-secondary"
                >
                  Left
                </button>
                <button
                  onClick={this.cancelCrop}
                  type="button"
                  className="btn btn-secondary"
                >
                  Right
                </button>
                <button
                  onClick={this.uploadImageTest}
                  type="button"
                  className="btn btn-secondary"
                >
                  Test
                </button>
              </div>
            </div>
            <div className="container row mt-4">
              <div className="col-md-2">
                <img
                  alt=""
                  src="https://randomuser.me/api/portraits/men/20.jpg"
                />
                <button className="btn btn-success"> Main Photo</button>
              </div>

              <div className="col-md-1" />
              <div className="col-md-2">
                <img
                  alt=""
                  src="https://randomuser.me/api/portraits/men/20.jpg"
                />
                <button className="btn btn-danger">
                  <i className="fas fa-trash" />{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(TestComponent);
