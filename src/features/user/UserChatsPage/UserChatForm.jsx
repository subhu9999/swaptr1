import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import TextArea from "./TextArea";
import cuid from "cuid";
import { isRequired,combineValidators } from "revalidate";

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
    const { addChatComment, reset, userChat, userId } = this.props;
    addChatComment(userChat, values, userId);
    reset();
  };

  //disable button if no -text
  render() {
    const { invalid, submitting, pristine } = this.props;
    const { userChat, userId } = this.props;
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleChatSubmit)}>
        <Card>
          <Card.Header>
            <img
              className="img-fluid user-chat-pic float-left mr-2"
              src={userChat.sellerProfilePic || "/assets/swaptr-listing.jpg"}
              alt="user_pic"
            />
            <Card.Title>{userChat.sellerName}</Card.Title>
          </Card.Header>

          <Card.Body className="overflow-auto mb-4 chat-box">
            <img
              className="img-fluid user-chat-listing  float-left mr-2"
              src={userChat.listingPhoto || "/assets/default-user.png"}
              alt="user_pic"
            />

            <Card.Subtitle className="mb-4 mt-4 text-muted">
              {userChat.listingTitle}
            </Card.Subtitle>
            {/* <Card.Text>{userChat.text}</Card.Text> */}
            {userChat &&
              userChat.comments &&
              userChat.comments.map(comment => {
                if (comment.authorId === userId) {
                  return (
                    // <Card.Text
                    //   key={comment.date + cuid()}
                    //   className="ml-2 mr-4 left-chat"
                    // >
                    //   {comment.text}
                    // </Card.Text>
                    <p
                      key={comment.date + cuid()}
                      className="ml-2 mr-4 w-50 text-white lead p-2 pl-4 speech-bubble-left"
                    >
                      {comment.text}
                    </p>
                  );
                }

                return (
                  <Card.Text
                    key={comment.date + cuid()}
                    className="margin-left-chat  text-white p-2 lead pr-4 mr-2 speech-bubble-right"
                  >
                    {comment.text}
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

export default reduxForm({ form: "userChat", validate })(UserChatForm);
