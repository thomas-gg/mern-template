import { Exercisepicker } from "../exercisepicker/Exercisepicker";
import { Trackerchart } from "../charts/Trackerchart";
export const ExerciseHistory = (props) => {
    return (
        <>
            <Exercisepicker handleSelect={props.handleSelect} />
            <Trackerchart graphData={props.graphData} />
        </>
    );
};