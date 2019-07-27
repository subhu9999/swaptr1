import React, { Component } from "react";
import Navbar from "../../../app/layout/nav/Navbar/Navbar";
import { Card, Row, Col } from "react-bootstrap";
import "./UserChatsPage.css";
import { withFirestore, firebaseConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import { addChatComment } from "../../user/userActions";
import { connect } from "react-redux";
import UserChatForm from "./UserChatForm";
import { objectToArrayDesc } from "../../../app/common/util/helpers";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

const mapState = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
    userChat:
      !isEmpty(state.firebase.data.user_chat) &&
      objectToArrayDesc(
        state.firebase.data.user_chat[ownProps.match.params.userId]
      )
  };
};
const actions = {
  addChatComment
};
class UserChatsPage extends Component {
  render() {
    const { addChatComment, userChat, auth } = this.props;
    const { userId } = this.props.match.params;
    // const pushSample = () => firebase.push("todos", "sampleTodo");
    if (userChat) {
      console.log(userChat);
    }

    return (
      <div>
        <Navbar />
        <Row className="user-chat-margin no-gutters">
          <Col>
            <Card.Header className="font-weight-bold border">INBOX</Card.Header>
            <Card className="overflow-auto mb-4 chat-box-nav-links">
              {userChat &&
                userChat.map(chat => (
                  <NavLink
                    key={chat.id}
                    to={`/chats/${auth.uid}/${chat.id}`}
                    // className="user-chat-active"
                    activeClassName="user-chat-active"
                  >
                    <Card.Body className="padding-0 m-0">
                      <img
                        className="img-fluid user-chat-pic float-left mr-2"
                        src={chat.listingPhoto || "/assets/default-user.png"}
                        alt="user_pic"
                      />
                      <Card.Title>{chat.sellerName}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Card Subtitle
                      </Card.Subtitle>
                      {/* <Card.Text>{userChat.text}</Card.Text> */}
                    </Card.Body>
                  </NavLink>
                ))}
            </Card>
          </Col>
          <Col className="border">
            <Switch>
              {userChat && userChat[0] && (
                <Route
                  key={userChat[0].id}
                  path={`/chats/${auth.uid}/${userChat[0].id}`}
                  render={() => (
                    <UserChatForm
                      chat={userChat[0]}
                      addChatComment={addChatComment}
                      userChat={userChat[0]}
                      userId={userId}
                    />
                  )}
                />
              )}
              {userChat &&
                userChat.map((chat, index) => {
                  if (index === 0) {
                    return (
                      <Redirect
                        key={chat.id}
                        exact
                        from={`/chats/${auth.uid}`}
                        to={`/chats/${auth.uid}/${chat.id}`}
                      />
                    );
                  } else {
                    return (
                      <Route
                        key={chat.id}
                        path={`/chats/${auth.uid}/${chat.id}`}
                        render={() => (
                          <UserChatForm
                            chat={chat}
                            addChatComment={addChatComment}
                            userChat={chat}
                            userId={userId}
                          />
                        )}
                      />
                    );
                  }
                })}
              }
            </Switch>

            {/* <UserChatForm addUserChat={addUserChat} listingId={listingId} /> */}
          </Col>
        </Row>
      </div>
    );
  }
}

export default compose(
  withFirestore,
  connect(
    mapState,
    actions
  ),
  // withFirebase
  firebaseConnect(props => [`user_chat/${props.match.params.userId}`])
)(UserChatsPage);

// export default compose(
//   withFirestore,
//   connect(
//     mapState,
//     actions
//   ),
//   // withFirebase
//   firebaseConnect(props => [
//     {
//       path: `user_chat/${props.match.params.listingId}`,
//       queryParams: ["orderByKey"]
//     }
//   ])
// )(UserChatsPage);

//always check firebase js to include more functions
