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

import {
  deleteImage,
  loadImages,
  resetImages,
  uploadImages
} from "./tempImagesActions";
import AdTitleInput from "./AdTitleInput";
import LocationInput from "./LocationInput";
import DescriptionInput from "./DescriptionInput";
import NavbarAlt from "../../../app/layout/nav/Navbar/NavbarAlt";
import NameInput from "./NameInput";
import PhoneInput from "./PhoneInput";
import ShowNumberToggle from "./ShowNumberToggle";
import SelectInput from "./SelectInput";
import { openModal } from "../../modals/modalActions";
import Dropzone from "react-dropzone";
import { toastr } from "react-redux-toastr";
// import { uploadTest, uploadImages } from "../../user/userActions";
import imageCompression from "browser-image-compression";
import { Container, Row, Col } from "react-bootstrap";
import {
  asyncActionStart,
  asyncActionError,
  asyncActionFinish
} from "../../async/asyncActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { withFirestore } from "react-redux-firebase";
import { Redirect } from "react-router";
import AuthDashboard from "../../../app/layout/nav/Navbar/AuthDashboard";

// const REACT_APP_CLOUDINARY_API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY;
const mapState = state => {
  let listing = {};

  return {
    initialValues: listing,
    async: state.async,
    // TODO: add images reducer
    images: state.tempImages,
    auth: state.firebase.auth
  };
};

const actions = {
  createListing,
  updateListing,
  uploadImages,
  deleteImage,
  openModal,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
  loadImages,
  resetImages
};

const validate = combineValidators({
  title: composeValidators(
    isRequired({ message: "The listing title is required" }),
    hasLengthGreaterThan(7)({
      message: "Title needs to be atleast 8 characters"
    })
  )(),
  city: isRequired({ message: "Location is important" }),
  sellerUserName: isRequired({ message: "Lets us confirm your name !" })
});

//TODO: delete image files when browser is closed
class ListingForm extends Component {
  state = {
    showNumber: true,
    maxImages: 10
    // images: []
  };

  async componentDidMount() {
    //extract current listing data for edit

    const { firestore, match, history } = this.props;
    if (match.params.id !== undefined) {
      let listing = await firestore.get(`listings/${match.params.id}`);
      if (!listing.exists) {
        history.push("/");
        toastr.error("Sorry", "No listing found");
      }
      let listingData = listing.data();

      //initializing redux form
      // console.log(listingData)
      this.props.initialize(listingData);

      //get images from listing
      if (listing.exists) {
        // populate to listingProps
        let listingImages = listingData.images;
        this.props.loadImages(listingImages);
      }
    }
  }

  onFormSubmit = async values => {
    let shareListing;
    let shareListingId;
    if (this.props.images.length <= 0) {
      toastr.error("No Images", "please add some images !");
      return;
    }
    // console.log(this.props.match.params.id);
    // if (this.props.initialValues.id) {
    let listingId = this.props.match.params.id;
    if (listingId) {
      const images = this.props.images;
      const imagesData = images.map(image => {
        return {
          imageURL: image.imageURL,
          imageName: image.imageName
        };
      });
      const updatedListing = {
        ...values,
        images: imagesData,
        showNumber: this.state.showNumber
      };
      this.props.updateListing(updatedListing, listingId);
      // console.log("updating...");
      this.props.history.goBack();
    } else {
      const images = this.props.images;
      const imagesData = images.map(image => {
        return {
          imageURL: image.imageURL,
          imageName: image.imageName
        };
      });
      // console.log(imagesData);
      const newListing = {
        ...values,
        images: imagesData,
        showNumber: this.state.showNumber
      };
      const createdListing = await this.props.createListing(newListing);
      // console.log(newListing);
      shareListingId = createdListing.id;
      shareListing = newListing;
      this.props.history.push(`/listing/${createdListing.id}`);
    }
    this.props.resetImages();
    this.props.openModal("ShareModal", {
      id: shareListingId,
      listingImage: shareListing.images[0].imageURL,
      title: shareListing.title
    });
  };

  toggleShowNumber = () => {
    this.setState({
      showNumber: !this.state.showNumber
    });
  };

  goHome = async () => {
    if (this.props.images.length > 0) {
      //delete images if cancel clicked
      let deleteTokenImages;
      deleteTokenImages = this.props.images.filter(image => image.deleteToken);
      // send only images which have deleteToken
      // console.log(deleteTokenImages);
      this.props.openModal("CancelListingModal", deleteTokenImages);
    } else {
      this.props.history.push("/");
    }
  };

  // deleteSelection = deleteToken => {
  //   // toastr.success("deleted", "1 photo deleted !");
  //   // console.log(deleteToken);
  //   //delete selected image from files
  //   // Initial FormData
  //   const formData = new FormData();
  //   formData.append("upload_preset", "v8yxkbjj"); // Replace the preset name with your own
  //   formData.append("api_key", REACT_APP_CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
  //   formData.append("token", deleteToken);
  //   // formData.append("q_auto", "c_scale", "w_300");

  //   // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
  //   return axios
  //     .post(
  //       "https://api.cloudinary.com/v1_1/dayoe8mly/delete_by_token",
  //       formData,
  //       {
  //         headers: { "X-Requested-With": "XMLHttpRequest" }
  //       }
  //     )

  //     .then(response => {
  //       // console.log(response);
  //       //remove the deleted image from images array using token
  //       const prevImages = this.state.images;
  //       const newImages = prevImages.filter(
  //         prevImage => prevImage.deleteToken !== deleteToken
  //       );

  //       this.setState({
  //         images: newImages
  //       });
  //     });
  // };

  deleteSelection = image => {
    try {
      this.props.deleteImage(image);
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  // uploadToServer = async compressedFile => {
  //   // Push all the axios request promise into a single array

  //   // Initial FormData
  //   const formData = new FormData();
  //   formData.append("file", compressedFile);
  //   formData.append("tags", `codeinfuse, medium, gist`);
  //   formData.append("upload_preset", "v8yxkbjj"); // Replace the preset name with your own
  //   formData.append("api_key", REACT_APP_CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
  //   formData.append("timestamp", (Date.now() / 1000) | 0);
  //   // formData.append("q_auto", "c_scale", "w_300");

  //   // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)

  //   return axios
  //     .post(
  //       "https://api.cloudinary.com/v1_1/dayoe8mly/image/upload",
  //       formData,
  //       {
  //         headers: { "X-Requested-With": "XMLHttpRequest" }
  //       }
  //     )

  //     .then(response => {
  //       const data = response.data;
  //       const fileURL = data.secure_url; // You should store this URL for future references in your app
  //       // console.log(data);
  //       const imageData = {
  //         publicID: data.public_id,
  //         imageURL: fileURL,
  //         deleteToken: data.delete_token
  //       };
  //       // console.log(data);
  //       this.setState(prevState => ({
  //         images: [...prevState.images, imageData]
  //       }));
  //     });

  // Once all the files are uploaded
  // axios.all(uploaders).then(res => {
  //   // ... perform after upload is successful operation
  //   // console.log("uploaders");
  //   // console.log(uploaders);
  // });
  // };

  uploadToFirebase = async compressedFile => {
    return await this.props.uploadImages(compressedFile);
  };

  handleDrop = async rawFiles => {
    //check current rawFiles Length and total rawFiles length
    //check remaining files length
    this.props.asyncActionStart();
    const remainingImages = this.state.maxImages - this.props.images.length;
    if (
      rawFiles.length > this.state.maxImages ||
      remainingImages < 0 ||
      rawFiles.length > remainingImages
    ) {
      toastr.error("Error", "Only 10 Images Allowed !");
      return;
    }
    // this.props.asyncActionStart();
    rawFiles.forEach(async rawFile => {
      var options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 700,
        useWebWorker: true
      };
      try {
        const compressedFile = await imageCompression(rawFile, options);

        await this.uploadToFirebase(compressedFile); // write your own logic
      } catch (error) {
        this.props.asyncActionError();
        console.log(error);
      }
    });
    // this.props.asyncActionFinish();
  };

  renderRedirect = () => {
    if (!this.props.auth.uid) {
      return <Redirect to="/" />;
    }
  };

  // while updating update date also
  render() {
    const { invalid, submitting, pristine } = this.props;
    const { images } = this.props;
    const { loading } = this.props.async;

    return (
      <div>
        {this.renderRedirect()}
        <NavbarAlt goHome={this.goHome} title="Swaptr" />
        <Banner />

        <Container>
          <h3 className="display-4 text-center mb-4">Post Your Ad</h3>

          {/* //add photos */}
          <p className="lead">Add Photos (Max 10 photos)</p>

          <Row className="justify-content-md-left">
            <Col md="8" className="mb-4">
              {loading ? (
                <div className="dropzone-loading">
                  <LoadingComponent />
                </div>
              ) : (
                <Dropzone
                  onDrop={files => this.handleDrop(files)}
                  multiple={true}
                  accept="image/jpeg"
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()} className="dropzone text-center">
                        <input {...getInputProps()} />

                        <i className=" fas fa-camera fa-3x m-2" />
                        <br />
                        <span className="m-2">Upload Photos</span>
                      </div>
                    </section>
                  )}
                </Dropzone>
              )}
            </Col>
            {/* //blank to fill space after upload div */}
            <Col md="4" />
            <Col md="8">
              <Row>
                {images &&
                  images.length > 0 &&
                  images.map(image => (
                    <div
                      className="col-6 col-md-3 margin-custom"
                      key={image.imageURL}
                    >
                      <img
                        alt=""
                        src={image.imageURL}
                        className="img-fluid img-listing-form"
                      />

                      <button
                        onClick={this.deleteSelection.bind(this, image)}
                        className="btn btn-danger btn-photo-delete"
                      >
                        x
                      </button>
                    </div>
                  ))}
              </Row>
            </Col>
          </Row>
          {/* //end of add photos */}

          <div className="col-12 col-md-8 ">
            <form
              className="listing-form border "
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
            >
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
                {this.props.match.params.id ? (
                  <div>
                    <div className="card-header h5 text-secondary">
                      Contact Details
                    </div>
                    <div className="card-body ">
                      <Field
                        name="sellerName"
                        type="text"
                        component={NameInput}
                      />
                      {this.state.showNumber && <PhoneInput />}
                      <ShowNumberToggle
                        defaultChecked={this.state.showNumber}
                        onChange={this.toggleShowNumber}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
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
        </Container>
         <AuthDashboard/> 
      </div>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({
      form: "listingForm",
      enableReinitialize: true,
      keepDirtyOnReinitialize: true,
      validate
    })(ListingForm)
  )
);
