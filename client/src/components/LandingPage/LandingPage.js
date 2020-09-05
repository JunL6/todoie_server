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
          <h1 className="text-light">Todoie</h1>
        </Row>
        <Row className="justify-content-center m-0">
          <h4 className="text-light">A simple todo list app.</h4>
        </Row>
        <Row className="justify-content-center pt-3 m-0">
          <Col xs="auto">
            <LinkContainer to="/signup">
              <Button variant="primary" size="lg">
                Get Started!
              </Button>
            </LinkContainer>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
