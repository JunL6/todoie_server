import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

class PrivateRoute extends React.Component {
  render() {
    const { component: PrivateComponent, path, ...rest } = this.props;
    return (
      <Route path={path} {...rest}>
        {this.props.authed ? <PrivateComponent /> : <Redirect to="/login" />}
      </Route>
    );
  }
}

const mapStateToProps = (state) => ({ authed: state.authed });
export default connect(mapStateToProps)(PrivateRoute);
