import Carousel from "react-bootstrap/Carousel";
import slide from './slide.png';
import cover from './LITFIT cover.png';
import "./styles.css";
export const MyCarousel = () => {
    return (
        <Carousel fade>
            <Carousel.Item className = "slide">
                <img
                    className="d-block w-100"
                    src={cover}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item className = "slide">
                <img
                    className="d-block w-100"
                    src={slide}
                    alt="Second slide"
                />

                <Carousel.Caption>
                    <h3>Track Your Workouts!</h3>
                    <p>Set your goals and see if you met them with our workout tracker.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className = "slide">
                <img
                    className="d-block w-100"
                    src={slide}
                    alt="Third slide"
                />

                <Carousel.Caption>
                    <h3>COMING SOON-Work out with friends!</h3>
                    <p>Find out what gyms are open, and find friends to work out or compete with!</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};