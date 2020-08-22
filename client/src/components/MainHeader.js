import React from "react";
import { Navbar, DropdownButton, Dropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { URL_LOGOUT } from '../config/urls';

function MainHeader(props) {

  let history = useHistory();


  function toggleSidebar() {
    props.setIsSidebarOpen(!props.isSidebarOpen);
  }

  function logoutClick(){
    axios.get(URL_LOGOUT)
    .then(()=>{
      history.push('/');
    })
  }

  return (
    <Navbar bg="dark">
      <LinkContainer
        to={props.authed ? "/app" : "/"}
        style={{ color: "white" }}
      >
        <Navbar.Brand>Todoie</Navbar.Brand>
      </LinkContainer>
      <Button variant="outline-secondary" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <DropdownButton
        className="ml-auto"
        title={props.authed}
        variant="secondary">      
          <Dropdown.Item  onClick={logoutClick}>Log out</Dropdown.Item>
      </DropdownButton>
    </Navbar>
  );
}

const mapStateToProps = (state) => ({
  authed: state.authed,
});

export default connect(mapStateToProps)(MainHeader);
