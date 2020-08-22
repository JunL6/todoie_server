import React from "react";
import classNames from "classnames";
import "./Sidebar.css";

export default function Sidebar(props) {
  return (
    <div
      bg="dark"
      className={classNames("sidebar", {
        "is-open": props.isSidebarOpen,
      })}
    >
      {props.children}
    </div>
  );
}
