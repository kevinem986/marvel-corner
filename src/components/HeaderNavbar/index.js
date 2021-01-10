import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
// import Image from 'react-bootstrap/Image';

const HeaderNavbar = () => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
    <Navbar.Toggle />
    <Navbar.Brand href="/">
        Marvel Corner
        {/* <Image height="70px" width="300px"  src="marvel-corner-logo.png" /> */}
    </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/characters">Characters</Nav.Link>
          <Nav.Link as={Link} to="/comics">Comics</Nav.Link>
          <Nav.Link as={Link} to="/stories">Stories</Nav.Link>
        </Nav>
        <Navbar.Text>
          <Nav.Link as={Link} to="/favorites">Favorites</Nav.Link>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderNavbar;
