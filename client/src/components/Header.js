import React from "react";
import { Navbar, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import "./Header.css";

function Header(props) {
  const currentURL = props.history.location.pathname;
  if (
    currentURL === "/login" ||
    currentURL === "/signup" ||
    currentURL === "/app"
  )
    return <></>;
  else
    return (
      <Navbar className="header transparent" expand="lg">
        <LinkContainer
          to={props.authed ? "/app" : "/"}
          style={{ color: "white" }}
        >
          <Navbar.Brand className="mr-auto">Todoie</Navbar.Brand>
        </LinkContainer>
        <LinkContainer to="/login">
          <Button variant="light" className="mr-2">
            Log in
          </Button>
        </LinkContainer>
        <LinkContainer to="/signup">
          <Button variant="outline-light" className="mr-2">
            Sign up
          </Button>
        </LinkContainer>
      </Navbar>
    );
}

const mapStateToProps = (state) => ({
  authed: state.authed,
});

export default connect(mapStateToProps)(Header);
