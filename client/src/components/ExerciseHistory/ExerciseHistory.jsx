import { Exercisepicker } from "../exercisepicker/Exercisepicker";
import { Trackerchart } from "../charts/Trackerchart";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ExcerciseHistoryList } from "./ExcerciseHistoryList";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
export const ExerciseHistory = (props) => {
  const [show, setShow] = useState(false);
  const [showGoal, setShowGoal] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setShow(false);
    let newExcerciseList = props.excerciseList;
    newExcerciseList.push({
      date: event.target[0].value,
      value: event.target[1].value,
      reps: event.target[2].value,
    });
    props.onUpdate(newExcerciseList);
  };
  const handleSubmitGoal = (event) => {
    event.preventDefault();
    props.onChangeGoal(event.target[0].value);
    setShowGoal(false);
  };
  const handleAdd = () => {
    console.log("???");
    setShow(true);
  };
  const handleGoalChange = () => {
    setShowGoal(true);
  };
  const handleClose = () => {
    setShow(false);
    setShowGoal(false);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Exercisepicker handleSelect={props.handleSelect} />
          <Trackerchart graphData={props.graphData} />
        </Col>
      </Row>
      <Row style={{ margin: 20 }}>
        <ExcerciseHistoryList
          excerciseList={props.excerciseList}
          onUpdate={props.onUpdate}
        />
      </Row>
      <Button variant="primary" onClick={handleAdd}>
        Add Excercise{" "}
      </Button>{" "}
      <Button variant="warning" onClick={handleGoalChange}>
        Change Goals
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add an Excercise</Modal.Title>
        </Modal.Header>{" "}
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Label>Date:</Form.Label>
              <Form.Control type="date" />
              <Form.Label>Value:</Form.Label>
              <Form.Control type="text" />
              <Form.Label>Reps:</Form.Label>
              <Form.Control type="text" />
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Modal show={showGoal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Setting Your Goal</Modal.Title>
        </Modal.Header>{" "}
        <Form onSubmit={handleSubmitGoal}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Label>Goal:</Form.Label>
              <Form.Control type="text" />
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};
