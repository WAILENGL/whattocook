import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="#home">What to Cook Today?</Navbar.Brand>
      <Nav className="ml-auto"> 
        <Nav.Link href="/favourites">Favourites</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;