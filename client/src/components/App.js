import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import LandingPage from "./LandingPage/LandingPage";
import Main from "./Main";
import "./App.css";
import { fetchUser } from "../actions";
import PrivateRoute from "./PrivateRoute";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <Route component={Header} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/" exact component={LandingPage} />
        <PrivateRoute path="/app" component={Main} />
      </div>
    );
  }
}

const mapDispatchToProps = { fetchUser };

export default connect(null, mapDispatchToProps)(App);
