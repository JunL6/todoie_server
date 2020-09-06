import React, { useState, useContext } from "react";
import axios from "axios";
import { InputGroup, FormControl, Button, Form, Row } from "react-bootstrap";
import { SelectedGroupContext } from "./SelectedGroupContext";

const inputBarCSS = { width: "10px" };

function InputBar(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = { text: "" };

  //   this.onInputChange = this.onInputChange.bind(this);
  //   this.onSubmit = this.onSubmit.bind(this);
  // }

  const [input, setInput] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useContext(
    SelectedGroupContext
  );

  function onInputChange(e) {
    setInput(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    let text = input.trim();
    if (!text) {
      return;
    }

    // api part
    insertTodo(text);

    // empty input bar text
    setInput("");
    console.log("add to do: " + text);
  }

  function insertTodo(todoContent) {
    axios
      .post("/api/insertTodo", {
        groupId: selectedGroupId,
        todoContent,
        createdTime: new Date(),
      })
      .then(() => {
        props.setCount((prevCount) => prevCount + 1);
      });
  }

  return (
    <Form inline onSubmit={onSubmit} className="mb-3">
      <FormControl
        type="text"
        value={input}
        onChange={onInputChange}
        className="mr-2 flex-grow-1"
        style={inputBarCSS}
      />
      <Button variant="primary" type="submit">
        Add Todo
      </Button>
    </Form>
  );
}

export default InputBar;
