import Dropdown from 'react-bootstrap/Dropdown'

export const Exercisepicker = (props) => {
    return (
        <Dropdown onSelect={props.handleSelect}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Select your Exercise
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item eventKey="Run">Run</Dropdown.Item>
                <Dropdown.Item eventKey="Swim">Swim</Dropdown.Item>
                <Dropdown.Item eventKey="Deadlift">Deadlift</Dropdown.Item>
                <Dropdown.Item eventKey="Squat">Squat</Dropdown.Item>
                <Dropdown.Item eventKey="Bench">Bench</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};