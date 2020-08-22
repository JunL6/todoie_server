import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  NavDropdown,
} from "react-bootstrap";

import { URL_SIGNUP } from "../../config/urls";
import { authUser } from "../../actions";
import logo from "../../img/Todoie_logo.svg";

function Signup(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  // const [validated, setValidated] = useState(false);
  const [hasUsernameExisted, setHasUsernameExisted] = useState(false);

  function handleSubmit(event) {
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    // setValidated(true);

    event.preventDefault();

    const formProps = { username, password };
    axios
      .post(URL_SIGNUP, formProps)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          props.authUser(formProps.username);
          props.history.push("/app");
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.toString().includes("409")) {
          setHasUsernameExisted(true);
          setPassword(null);
        }
      });
  }

  function onUsernameInputChange(e) {
    setUsername(e.target.value);
  }

  function onPasswordInputChange(e) {
    setPassword(e.target.value);
  }

  return (
    // <div>
    //   <Link to="/">Todoie</Link>
    //   <div>Sign up</div>
    //   <form onSubmit={handleSubmit(this.onFormSubmit)}>
    //     <fieldset>
    //       <label>Email:</label>
    //       <Field name="username" component="input" type="text" />
    //     </fieldset>
    //     <fieldset>
    //       <label>Password: </label>
    //       <Field name="password" component="input" type="password" />
    //     </fieldset>
    //     <button>Sign up</button>
    //   </form>
    //   <div>todo: error message</div>
    // </div>
    <div className="auth bg-light">
      <Container fluid>
        <Row className="pt-5 justify-content-center align-items-center">
          <Link to="/" className="d-flex align-items-end logo-link">
            <img src={logo} width="30" height="30" />
            <h3 className="d-inline-block m-0 text-dark">odoie</h3>
          </Link>
        </Row>
        <Row className="my-4 justify-content-center">
          <Col className="auth-form-container pt-3 pb-4 px-4 border rounded">
            <Form
              //  validated={validated}
              onSubmit={handleSubmit}
            >
              <h3 className="text-center text-secondary">Sign up</h3>
              <Form.Group controlId="formBasicEmail">
                <Form.Label className="font-weight-bold">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  onChange={onUsernameInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a proper Email.
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword" className="mb-4">
                <Form.Label className="font-weight-bold">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  onChange={onPasswordInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a proper password.
                </Form.Control.Feedback>
              </Form.Group>

              <Button variant="primary" type="submit" block>
                Sign up
              </Button>
              <div
                className="text-danger"
                style={{ display: hasUsernameExisted ? "block" : "none" }}
              >
                Email has been registered.
              </div>
            </Form>
            <NavDropdown.Divider />
            <div className="text-muted">
              Already have an account? <Link to="/login">Log in</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapDispatchToProps = { authUser };
export default connect(null, mapDispatchToProps)(Signup);

// export default reduxForm({ form: "signup" })(connectedComponent);
