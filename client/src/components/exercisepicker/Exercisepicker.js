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
                <Dropdown.Item eventKey="Shoulder Press">Shoulder Press</Dropdown.Item>
                <Dropdown.Item eventKey="Dumbbell Shoulder Press">Dumbbell Shoulder Press</Dropdown.Item>
                <Dropdown.Item eventKey="Incline Bench Press">Incline Bench Press</Dropdown.Item>
                <Dropdown.Item eventKey="Leg Press">Leg Press</Dropdown.Item>
                <Dropdown.Item eventKey="Barbell Row">Barbell Row</Dropdown.Item>
                <Dropdown.Item eventKey="Incline Dumbbell Bench Press">Incline Dumbbell Bench Press</Dropdown.Item>
                <Dropdown.Item eventKey="Dumbbell Bench Press">Dumbbell Bench Press</Dropdown.Item>
                <Dropdown.Item eventKey="Dumbbell Curl">Dumbbell Curl</Dropdown.Item>
                <Dropdown.Item eventKey="Dumbbell Hammer Curl">Dumbbell Hammer Curl</Dropdown.Item>
                <Dropdown.Item eventKey="Barbell Curl">Barbell Curl</Dropdown.Item>
                <Dropdown.Item eventKey="Front Squat">Front Squat</Dropdown.Item>
                <Dropdown.Item eventKey="Leg Curl">Leg Curl</Dropdown.Item>
                <Dropdown.Item eventKey="Pull Ups">Pull Ups</Dropdown.Item>
                <Dropdown.Item eventKey="Push Ups">Push Ups</Dropdown.Item>
                <Dropdown.Item eventKey="Dips">Dips</Dropdown.Item>
                <Dropdown.Item eventKey="Lateral Raise">Lateral Raise</Dropdown.Item>
                <Dropdown.Item eventKey="Face Pulls">Face Pulls</Dropdown.Item>
                <Dropdown.Item eventKey="Leg Extensions">Leg Extensions</Dropdown.Item>
                <Dropdown.Item eventKey="Clean">Clean</Dropdown.Item>
                <Dropdown.Item eventKey="Clean and Jerk">Clean and Jerk</Dropdown.Item>
                <Dropdown.Item eventKey="Snatch">Snatch</Dropdown.Item>
                <Dropdown.Item eventKey="Bulgarian Split Squat">Bulgarian Split Squat</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};