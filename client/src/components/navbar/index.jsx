import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const MyNav = (props) => {
  return (
    <div className="MyNav">
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand>
            <Nav.Link style = {{color : "white"}} as = {Link} to = "/"><img
              alt=""
              src={logo}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{" "}
            LitFit-The Littest Way To Get Fit
            </Nav.Link>
          </Navbar.Brand>
          <Nav>
            {!props.loggedIn && <Nav.Link as={Link} to="/users/login">
              Login
            </Nav.Link>}
            {props.loggedIn && <Nav.Link as={Link} to="/exercises/log">
              Exercise Log
            </Nav.Link>}
            {props.loggedIn && <Nav.Link as={Link} to="/" onClick={props.logOut}>
              Logout
            </Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};
