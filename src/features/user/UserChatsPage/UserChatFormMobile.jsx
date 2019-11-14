import React, { Component } from "react";
import { Form, Button, Card, Row } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import TextArea from "./TextArea";
import cuid from "cuid";
import { isRequired, combineValidators } from "revalidate";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import { connect } from "react-redux";
import { compose } from "redux";
import "./UserChatsPage.css";
import { objectToArrayDesc } from "../../../app/common/util/helpers";
import { isEmpty } from "react-redux-firebase";
import { addChatComment, deleteChat } from "../userActions";
import NavbarAlt from "../../../app/layout/nav/Navbar/NavbarAlt";

const mapState = state => {
  return {
    auth: state.firebase.auth,
    userChat:
      !isEmpty(state.firebase.data.user_chat) &&
      objectToArrayDesc(state.firebase.data.user_chat[state.firebase.auth.uid])
  };
};

const actions = {
  addChatComment,
  deleteChat
};
const validate = combineValidators({
  comment: isRequired({ message: "type a message" })
});

class userChatFormMobile extends Component {
  componentDidMount = async () => {
    this.scrollToBottom();
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  handleChatSubmit = values => {
    const { addChatComment, reset, userChat, match } = this.props;
    let chat = "";
    if (userChat) {
      let filteredChat = userChat.filter(
        chat => chat.id === match.params.chatId
      );
      chat = filteredChat[0];
      // console.log(values);
      addChatComment(chat, values);
    }

    reset();
  };

  handleDeleteChat = chatId => {
    const { deleteChat, auth } = this.props;
    deleteChat(chatId);
    this.props.history.push(`/chats/${auth.uid}`);
  };

  goHome = () => {
    const { auth } = this.props;
    this.props.history.push(`/chats/${auth.uid}`);
  };

  render() {
    const { invalid, submitting, pristine, reset } = this.props;
    const { auth, match } = this.props;
    const { handleDeleteChat, handleChatSubmit } = this;
    const { userChat } = this.props;
    // console.log(userChat);
    let chat = "";
    if (userChat) {
      let filteredChat = userChat.filter(
        chat => chat.id === match.params.chatId
      );
      chat = filteredChat[0];
      // console.log(chat);
    }

    return (
      <div>
        <NavbarAlt goHome={this.goHome} />
        <div className="chat-form-mobile"></div>
        <Form onSubmit={this.props.handleSubmit(this.handleChatSubmit)}>
          <Card>
            <Card.Header>
              <Link to={`/profile/${chat.receiverUid}`}>
                <img
                  className="img-fluid user-chat-pic float-left mr-2"
                  src={chat.receiverPic || "/assets/default-user.png"}
                  alt="user_pic"
                />
                <Card.Title>{chat.receiverName}</Card.Title>
              </Link>

              {chat.receiverLastSeen ? (
                <Card.Subtitle className="text-muted">
                  last seen on {format(chat.receiverLastSeen, `MMM DD`)} at{" "}
                  {format(chat.receiverLastSeen, `HH:mm`)}
                  <div className="dropdown float-right">
                    <button
                      className="btn"
                      type="button"
                      id="dropdownChatOptions"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-v" />
                    </button>
                    <div
                      className=" dropdown-menu dropdown-menu-right"
                      aria-labelledby="dropdownChatOptions"
                    >
                      <button
                        className=" dropdown-item"
                        onClick={() => handleDeleteChat(chat.id)}
                      >
                        Delete Chat
                      </button>
                    </div>
                  </div>
                </Card.Subtitle>
              ) : (
                <Card.Subtitle className="text-muted">
                  <div className="dropdown float-right">
                    <button
                      className="btn"
                      type="button"
                      id="dropdownChatOptions"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-v" />
                    </button>
                    <div
                      className="dropdown-menu dropdown-menu-right"
                      aria-labelledby="dropdownChatOptions"
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => handleDeleteChat(chat.id)}
                      >
                        Delete Chat
                      </button>
                    </div>
                  </div>
                </Card.Subtitle>
              )}
            </Card.Header>

            <Card.Body className="overflow-auto mb-4 chat-box">
              <Link to={`/listing/${chat.listingId}`}>
                <img
                  className="img-fluid user-chat-listing  float-left mr-2"
                  src={chat.listingPhoto || "/assets/swaptr-listing.jpg"}
                  alt="listing_pic"
                />

                <Card.Subtitle className="mb-4 mt-4 text-muted">
                  {chat.listingTitle}
                </Card.Subtitle>
              </Link>
              {chat &&
                chat.comments &&
                chat.comments.map(comment => {
                  if (comment.authorId === auth.uid) {
                    return (
                      <Card.Text
                        key={comment.date + cuid()}
                        className="margin-left-chat  text-white p-2 lead pr-4 mr-2 speech-bubble-right"
                      >
                        {comment.text}
                        {comment.swapListing && (
                          <Link to={`/listing/${comment.swapListing.id}`}>
                            <img
                              className="swap-image-chat d-block img-thumbnail"
                              src={
                                comment.swapListing.image.imageURL ||
                                "/assets/swaptr-listing.jpg"
                              }
                              alt="swap_photo"
                            />
                            <span className="d-block lead text-white text-capitalize font-weight-bold">
                              {comment.swapListing.title}
                            </span>
                            <button className="btn btn-primary btn-block rounded-0">
                              View Ad
                            </button>
                            <span className="text-white font-weight-bold">
                              Location:
                            </span>
                            <span className="ml-1 text-white font-weight-light font-italic">
                              {comment.swapListing.city}
                            </span>
                          </Link>
                        )}
                        <small className="p-2 float-right text-white">
                          {comment &&
                            comment.date &&
                            format(comment.date, "HH:mm")}
                        </small>
                      </Card.Text>
                    );
                  }

                  return (
                    <Card.Text
                      key={comment.date + cuid()}
                      className="ml-2 mr-4 w-50 text-white lead p-2 pl-4 speech-bubble-left"
                    >
                      {comment.text}
                      {comment.swapListing && (
                        <Link to={`/listing/${comment.swapListing.id}`}>
                          <img
                            className="swap-image-chat d-block img-thumbnail"
                            src={
                              comment.swapListing.image.imageURL ||
                              "/assets/swaptr-listing.jpg"
                            }
                            alt="swap_photo"
                          />
                          <span className="d-block lead text-white text-capitalize font-weight-bold">
                            {comment.swapListing.title}
                          </span>
                          <button className="btn btn-primary btn-block rounded-0">
                            View Ad
                          </button>
                          <span className="text-white font-weight-bold">
                            Location:
                          </span>
                          <span className="ml-1 text-white font-weight-light font-italic">
                            {comment.swapListing.city}
                          </span>
                        </Link>
                      )}

                      <small className="p-2 float-right text-white">
                        {comment &&
                          comment.date &&
                          format(comment.date, "HH:mm")}
                      </small>
                    </Card.Text>
                  );
                })}
              <div className="mt-1 dummy-bottom" />
              <div
                style={{ float: "left", clear: "both" }}
                ref={el => {
                  this.messagesEnd = el;
                }}
              />
            </Card.Body>
          </Card>
          <div className="chatFormMobileText">
            <Field
              name="comment"
              type="text"
              component={TextArea}
              // props={{
              //   handleChatSubmit,
              //   addChatComment,
              //   reset,
              //   userChat,
              //   match
              // }}
              rows={2}
            />
            <button
              type="submit"
              className="btn send-chat-button-mobile rounded-0 text-primary"
              disabled={invalid || submitting || pristine}
            >
              <i className="fas fa-chevron-circle-right fa-2x " />
            </button>
          </div>
        </Form>
      </div>
    );
  }
}
export default compose(
  connect(mapState, actions),
  reduxForm({ form: "userChatFormMobile", validate })
)(userChatFormMobile);
