import React, { Component } from "react";
import Navbar from "../../../app/layout/nav/Navbar/Navbar";
import { Card, Row, Col } from "react-bootstrap";
import "./UserChatsPage.css";
import { withFirestore, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import {
  addChatComment,
  deleteChat,
  setCurrentSeenTrue
} from "../../user/userActions";
import { connect } from "react-redux";
import UserChatForm from "./UserChatForm";
import { objectToArrayDesc } from "../../../app/common/util/helpers";
import { NavLink, Link, Switch, Route, Redirect } from "react-router-dom";
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
  addChatComment,
  deleteChat,
  setCurrentSeenTrue
};
class UserChatsPage extends Component {
  handleSeen = chat => {
    const { setCurrentSeenTrue } = this.props;
    // console.log(chat);
    if (chat.currentSeen === false) {
      // make currentSeen true
      setCurrentSeenTrue(chat);
    }
  };

  render() {
    const { handleSeen } = this;
    const { addChatComment, userChat, auth, deleteChat } = this.props;
    const { userId } = this.props.match.params;
    let emptyChat = "";
    if (userChat === undefined) {
      // console.log(userChat);
      emptyChat = (
        <div className="m-2 font-weight-bold lead">
          <Card.Body>
            <Card.Title>No chats available</Card.Title>
            <Card.Text className="hide-sm">
              Post your free ad in less than a minute to receive messages
            </Card.Text>
            <NavLink
              to="/createListing"
              className="btn btn-primary listing-ad-btn mb-3 rounded-0"
            >
              <span className="font-weight-bold">Post Ad</span>
            </NavLink>
          </Card.Body>
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        <Row className="user-chat-margin no-gutters">
          <Col className="hide-visibility-sm">
            <Card.Header className="font-weight-bold border">INBOX</Card.Header>

            <Card className="overflow-auto mb-4 chat-box-nav-links">
              {emptyChat}
              {userChat &&
                userChat.map(chat => (
                  <NavLink
                    key={chat.id}
                    to={`/chats/${auth.uid}/${chat.id}`}
                    // className="user-chat-active"
                    activeClassName="user-chat-active"
                  >
                    <Card.Body
                      className="padding-0 m-0"
                      onClick={() => handleSeen(chat)}
                    >
                      <img
                        className="img-fluid user-chat-pic float-left mr-2"
                        src={chat.listingPhoto || "/assets/swaptr-listing.jpg"}
                        alt="listing_pic"
                      />

                      <Card.Title>
                        {chat.receiverName}
                        {chat.currentSeen ? (
                          ""
                        ) : (
                          <i className="fas fa-circle float-right text-danger mt-1"></i>
                        )}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {chat.comments &&
                          chat.comments.length > 0 &&
                          chat.comments[chat.comments.length - 1].text}
                      </Card.Subtitle>
                    </Card.Body>
                  </NavLink>
                ))}
            </Card>
          </Col>
          <Col className="border hide-visibility-sm">
            <Switch>
              {userChat && userChat[0] && (
                <Route
                  key={userChat[0].id}
                  path={`/chats/${auth.uid}/${userChat[0].id}`}
                  render={() => (
                    <UserChatForm
                      addChatComment={addChatComment}
                      userChat={userChat[0]}
                      userId={userId}
                      deleteChat={deleteChat}
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
                            addChatComment={addChatComment}
                            userChat={chat}
                            userId={userId}
                            deleteChat={deleteChat}
                          />
                        )}
                      />
                    );
                  }
                })}
              }
            </Switch>
          </Col>

          {/* //for small screens */}
          <Col className="hide-visibility-lg chat-navlinks-sm">
            <Card.Header className="font-weight-bold border">INBOX</Card.Header>

            <Card className="overflow-auto mb-4 chat-box-nav-links">
              {emptyChat}
              {userChat &&
                userChat.map(chat => (
                  <Link
                    key={chat.id}
                    to={`/chats/sm/${chat.id}`}
                    // activeClassName="user-chat-active"
                  >
                    <Card.Body
                      className="padding-0 m-0"
                      onClick={() => handleSeen(chat)}
                    >
                      <img
                        className="img-fluid user-chat-pic float-left mr-2"
                        src={chat.listingPhoto || "/assets/swaptr-listing.jpg"}
                        alt="listing_pic"
                      />
                      <Card.Title>
                        {chat.receiverName}
                        {chat.currentSeen ? (
                          ""
                        ) : (
                          <i className="fas fa-circle float-right text-danger mt-1"></i>
                        )}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Card Subtitle
                      </Card.Subtitle>
                    </Card.Body>
                  </Link>
                ))}
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default compose(
  withFirestore,
  connect(mapState, actions)
  // withFirebase
  // firebaseConnect(props => [`user_chat/${props.match.params.userId}`])
)(UserChatsPage);
//firebase cionnect for user chat shifted to navbar
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
