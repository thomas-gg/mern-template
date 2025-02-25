import { MyNav } from "../navbar";
import { MyButton } from "../button/MyButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { MyCarousel } from "../carousel/carousel";
import "./home.css";

const Home = (props) => {
  return (
    <div className="test">
      <MyNav loggedIn = {props.loggedIn} logOut = {props.logOut}/>
      <div className="App">
        <header className="App-header">
          <h1 className="slogan">
            Get Lit and Get Fit!
          </h1>
          <MyCarousel />
          <br />
          <h3>Login and get started now!</h3>
        </header>
      </div>
    </div>
  );
};

export default Home;
