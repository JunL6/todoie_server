import React from "react";

export default function CreateGroup({ onHandleClick }) {
  return (
    <button className="create-group" onClick={onHandleClick}>
      Add group
    </button>
  );
}
