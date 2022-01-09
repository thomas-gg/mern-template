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
                <Dropdown.Item eventKey="Barbell Row">Barbell Row</Dropdown.Item>
                <Dropdown.Item eventKey="Shoulder Press">Shoulder Press</Dropdown.Item>
                <Dropdown.Item eventKey="Pull Ups">Pull Ups</Dropdown.Item>
                <Dropdown.Item eventKey="Dumbell Bench Press">Dumbbell Bench Press</Dropdown.Item>
                <Dropdown.Item eventKey="Dumbbell Curl">Pull Ups</Dropdown.Item>
                <Dropdown.Item eventKey="Barbell Curl">Pull Ups</Dropdown.Item>
                <Dropdown.Item eventKey="Bent Over Row">Pull Ups</Dropdown.Item>
                <Dropdown.Item eventKey="Front Squat">Pull Ups</Dropdown.Item>
                <Dropdown.Item eventKey="Bent Over Row">Pull Ups</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};