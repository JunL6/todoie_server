import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ListGroup, Button, Row, Modal } from "react-bootstrap";
import classNames from "classnames";

// import { selectGroup, addGroup } from "../actions";
import { SelectedGroupContext } from "../SelectedGroupContext";
import AddGroupModal from "../AddGroupModal";
import { URL_ADD_GROUP } from "../../config/urls";
import "./GroupSelector.css";
// import Modal from "react-modal";
// Modal.setAppElement("#root");

export default function GroupSelector(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupNameInput, setGroupNameInput] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useContext(
    SelectedGroupContext
  );

  /* */
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* I am not sure if I should move this useEffect logic to Main.js */
  useEffect(() => {
    if (!selectedGroupId && props.groups.length > 0) {
      setSelectedGroupId(props.groups[0]._id);
    }
  }, [selectedGroupId, props.groups]);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function onGroupNameInputChange(e) {
    if (e.target.value) {
      const text = e.target.value.trim();
      setGroupNameInput(text);
    }
  }

  function onAddNewGroup(e) {
    e.preventDefault();
    axios
      .post(URL_ADD_GROUP, {
        groupName: groupNameInput,
        timeCreated: new Date(),
      })
      .then((response) => {
        console.log(response);
        setSelectedGroupId(response.data._id);
        props.setCount((prevCount) => prevCount + 1);
      });

    closeModal();
    setGroupNameInput("");
    // this.setState({ isModalOpen: false, groupNameInput: "" });
  }

  function renderGroupList(groupList, currentGroupId) {
    return groupList.map((group) => {
      return (
        <ListGroup.Item
          key={group._id}
          className={classNames("item", {
            "item-selected": group._id === currentGroupId,
            "text-primary": group._id === currentGroupId,
          })}
          onClick={() => {
            setSelectedGroupId(group._id);
          }}
        >
          <span>{group.groupName}</span>
        </ListGroup.Item>
      );
    });
  }

  return (
    <div className="group-selector mt-5">
      <h4 className="mb-3 ml-3">Groups</h4>
      <ListGroup className="mb-2">
        {renderGroupList(props.groups, selectedGroupId)}
      </ListGroup>
      <Row className="justify-content-center">
        <Button
          variant="secondary"
          size="sm"
          className="mt-3"
          onClick={openModal}
        >
          Add group
        </Button>
      </Row>

      <AddGroupModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        onGroupNameInputChange={onGroupNameInputChange}
        onAddNewGroup={onAddNewGroup}
      />

      {/* <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        overlayClassName="modal-overlay"
        className="modal-content"
      >
        <div>
          <header>
            <h3>Add Group</h3>
            <button onClick={closeModal}>x</button>
          </header>
          <form onSubmit={onAddNewGroup}>
            <label>Group Name: </label>
            <input onChange={onGroupNameInputChange} type="text"></input>
          </form>
          <footer>
            <Button variant="light" onClick={onAddNewGroup}>
              Add
            </Button>
          </footer>
        </div>
      </Modal> */}
    </div>
  );
}
