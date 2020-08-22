import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../../img/logo.svg";
import "./LandingPage.css";

export default function LandingPage(props) {
  return (
    <Container fluid className="landing-page">
      <div className="layer"> </div>
      <div className="content d-flex flex-column justify-content-center">
        <Row className="justify-content-center py-3 m-0">
          {/* <Col xs="auto"> */}
          {/* <svg
            className="logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 278 278"
          >
            <path d="M254.8 0h-98.5 -33 -99.5C15.5 0 8.5 6.7 8.5 15v33c0 8.3 6.7 15 15 15s15-6.7 15-15V30h69v218H89.8c-8.3 0-15 6.7-15 15s6.7 15 15 15h99c8.3 0 15-6.7 15-15s-6.7-15-15-15H170.5V30h69v18c0 8.3 6.7 15 15 15s15-6.7 15-15V15C269.5 6.7 263.1 0 254.8 0z" />
          </svg>
          <h2>odoie</h2> */}
          {/* <img src={logo} width="360" height="400" /> */}
          {/* </Col> */}
          <h1 className="text-light">Todoie</h1>
        </Row>
        <Row className="justify-content-center m-0">
          <h4 className="text-light">A simple todo list app.</h4>
        </Row>
        <Row className="justify-content-center pt-3 m-0">
          <Col xs="auto">
            <LinkContainer to="/signup">
              <Button variant="info" size="lg">
                Sign up for free now!
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
