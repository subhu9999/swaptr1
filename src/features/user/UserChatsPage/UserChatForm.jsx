import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import TextArea from "./TextArea";
import cuid from "cuid";
import { isRequired, combineValidators } from "revalidate";
import { Link } from "react-router-dom";
import format from "date-fns/format";

const validate = combineValidators({
  comment: isRequired({ message: "type a message" })
});

class UserChatForm extends Component {
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  handleChatSubmit = values => {
    const { addChatComment, reset, userChat } = this.props;
    console.log(values);
    addChatComment(userChat, values);
    reset();
  };

  handleDeleteChat = chatId => {
    const { deleteChat } = this.props;
    deleteChat(chatId);
  };

  //disable button if no -text
  render() {
    const { invalid, submitting, pristine } = this.props;
    const { userChat, userId } = this.props;
    const { handleDeleteChat } = this;
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleChatSubmit)}>
        <Card>
          <Card.Header>
            <Link to={`/profile/${userChat.receiverUid}`}>
              <img
                className="img-fluid user-chat-pic float-left mr-2"
                src={userChat.receiverPic || "/assets/default-user.png"}
                alt="user_pic"
              />
              <Card.Title>{userChat.receiverName}</Card.Title>
            </Link>

            {userChat.receiverLastSeen ? (
              <Card.Subtitle className="text-muted">
                last seen on {format(userChat.receiverLastSeen, `MMM DD`)} at{" "}
                {format(userChat.receiverLastSeen, `HH:mm`)}
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
                      onClick={() => handleDeleteChat(userChat.id)}
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
                      onClick={() => handleDeleteChat(userChat.id)}
                    >
                      Delete Chat
                    </button>
                  </div>
                </div>
              </Card.Subtitle>
            )}
          </Card.Header>

          <Card.Body className="overflow-auto mb-4 chat-box">
            <Link to={`/listing/${userChat.listingId}`}>
              <img
                className="img-fluid user-chat-listing  float-left mr-2"
                src={userChat.listingPhoto || "/assets/swaptr-listing.jpg"}
                alt="listing_pic"
              />

              <Card.Subtitle className="mb-4 mt-4 text-muted">
                {userChat.listingTitle}
              </Card.Subtitle>
            </Link>
            {userChat &&
              userChat.comments &&
              userChat.comments.map(comment => {
                if (comment.authorId === userId) {
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
                          <button className="btn btn-dark btn-block rounded-0">
                            View this Ad
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
                        <button className="btn btn-dark btn-block rounded-0">
                          View this Ad
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
                      {comment && comment.date && format(comment.date, "HH:mm")}
                    </small>
                  </Card.Text>
                );
              })}
            <div
              style={{ float: "left", clear: "both" }}
              ref={el => {
                this.messagesEnd = el;
              }}
            />
          </Card.Body>
        </Card>
        <Field name="comment" type="text" component={TextArea} rows={2} />
        <Button
          type="submit"
          className="send-chat-button "
          disabled={invalid || submitting || pristine}
        >
          <i className="fas fa-chevron-circle-right" />
        </Button>
      </Form>
    );
  }
}

export default reduxForm({ form: "userChatForm", validate })(UserChatForm);
