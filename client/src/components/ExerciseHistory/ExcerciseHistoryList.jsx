import React, { useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";

function formatDate(date) {
  console.log(date);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-US", options);
}

export const ExcerciseHistoryList = (props) => {
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleShow = (current) => {
    // console.log("???", current);
    setShow(true);
    setCurrent(current);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("submit clicked!");
    // console.log(props.excerciseList[current].date.slice(0, 10));
    // console.log(event.target[0].value);
    // console.log("call update");
    let updatedList = props.excerciseList;
    updatedList[current].value = event.target[1].value;
    updatedList[current].date = event.target[0].value.slice(0, 10);
    updatedList[current].reps = event.target[2].value;
    props.onUpdate(updatedList);
    setShow(false);
  };

  const handleDelete = () => {
    let updateList = props.excerciseList;
    updateList.splice(current, 1);
    props.onUpdate(updateList);
    setShow(false);
  };

  const listItems = props.excerciseList.map((excercise, index) => (
    <ListGroup.Item>
      <Button variant="link" onClick={() => handleShow(index)}>
        {formatDate(excercise.date)}, Best result: {excercise.value}, Reps:{" "}
        {excercise.reps}
      </Button>
    </ListGroup.Item>
  ));

  return (
    <>
      <ListGroup>{listItems}</ListGroup>
      {props.excerciseList.length && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit This Excercise</Modal.Title>
          </Modal.Header>{" "}
          <Form onSubmit={handleSubmit}>
            <Modal.Body>
              <Row className="mb-3">
                <Form.Label>Date:</Form.Label>
                <Form.Control
                  type="date"
                  defaultValue={props.excerciseList[current].date.slice(0, 10)}
                />
                <Form.Label>Value:</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={props.excerciseList[current].value}
                />
                <Form.Label>Reps:</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={props.excerciseList[current].reps}
                />
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      )}
    </>
  );
};
