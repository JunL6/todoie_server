import React from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

export default function AddGroupModal(props) {
  return (
    <Modal show={props.isModalOpen} onHide={props.closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>New group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <FormControl
            placeholder="New group name"
            onChange={props.onGroupNameInputChange}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={props.onAddNewGroup}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
