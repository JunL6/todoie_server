import React, { Component } from "react";
import { connect } from "react-redux";
import { switchVisibility } from "../actions";
import { STATUS_ALL, STATUS_TODO, STATUS_DONE } from "../utils/const";

class StatusToggle extends Component {
  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
  }

  renderButton(text, status) {
    return (
      <button
        className={
          this.props.visibility === status
            ? "status-toggle_button--selected"
            : ""
        }
        onClick={() => this.props.switchVisibility(status)}
      >
        {text}
      </button>
    );
  }

  render() {
    return (
      <div className="status-toggle">
        {this.renderButton("All", STATUS_ALL)}
        {this.renderButton("Todo", STATUS_TODO)}
        {this.renderButton("Done", STATUS_DONE)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    visibility: state.visibility,
  };
}

export default connect(mapStateToProps, { switchVisibility })(StatusToggle);
