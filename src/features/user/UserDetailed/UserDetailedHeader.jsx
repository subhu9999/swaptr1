import { Row, Col, Card, Button } from "react-bootstrap";

import React from "react";
import format from "date-fns/format";

export default function UserDetailedHeader({ userProfile }) {
  let joiningDate = "NAN";
  if (userProfile) {
    joiningDate = format(userProfile.createdAt.toDate(), "MMM YYYY");
  }
  return (
    <Row className="mb-2 justify-content-md-center">
      <Col>
        <Card className="user-detailed-margin">
          <Card.Header as="h5" className="text-center">
            Seller Profile
          </Card.Header>
          <Card.Body>
            <img
              className="img-fluid float-left user-detailed-profile-pic mr-2"
              src={userProfile.photoURL || "/assets/default-user.png"}
              alt="user_pic"
            />
            <Card.Title>{userProfile.displayName}</Card.Title>
            <Card.Text>Joined On {joiningDate}</Card.Text>
            <Button variant="primary" className="rounded-0">
              Send Message
            </Button>
          </Card.Body>
          <Card.Footer className="text-muted">Seller Post's</Card.Footer>
        </Card>
      </Col>
    </Row>
  );
}
