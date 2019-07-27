import React, { Component } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import TextArea from "./TextArea";
import cuid from "cuid";

class UserChatForm extends Component {
  handleChatSubmit = values => {
    const { addChatComment, reset, userChat } = this.props;
    addChatComment(userChat, values);
    reset();
  };
  render() {
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
                    <Card.Text
                      key={comment.date + cuid()}
                      className="ml-2 mr-4"
                    >
                      {comment.text}
                    </Card.Text>
                  );
                }

                return (
                  <Card.Text
                    key={comment.date + cuid()}
                    className="mr-2 margin-left-chat"
                  >
                    {comment.text}
                  </Card.Text>
                );
              })}
          </Card.Body>
        </Card>
        <Field name="comment" type="text" component={TextArea} rows={2} />
        <Button type="submit" className="send-chat-button ">
          <i className="fas fa-chevron-circle-right" />
        </Button>
        {/* TODO: // limit text characters 70*/}
      </Form>
    );
  }
}

export default reduxForm({ form: "userChat" })(UserChatForm);
