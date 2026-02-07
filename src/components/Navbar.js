import { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../UserContext";

export default function AppNavbar(){

	const { user } = useContext(UserContext);

	console.log(user);

	return (

			<Navbar sticky="top" expand="lg" className="navigate">
			    <Container fluid>
			        <Navbar.Brand href="#home">ARCODEX</Navbar.Brand>
			        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
			        <Navbar.Collapse id="basic-navbar-nav">
			            <Nav className="ms-auto">
			            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
			            <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
			            {
			            	(user.id !== null) ?
			            	// (user !== null) ?
			            		(user.isAdmin ) ?
				            		<>
				            			<Nav.Link as={Link} to="/addProduct">Add Product</Nav.Link>
										<Nav.Link as={Link} to="/admin/orders">User Order History</Nav.Link>
										<Nav.Link as={Link} to="/set-as-admin">Set User as Admin</Nav.Link>
				            			<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
				            		</>
			            		:
				            		<>
										<Nav.Link as={Link} to="/cart">Cart</Nav.Link>
				            			<Nav.Link as={Link} to="/profile">Profile</Nav.Link>
				            			<Nav.Link as={Link} to="/logout">Logout</Nav.Link>
				            		</>
			            	: 
			            		<>
			            			<Nav.Link as={Link} to="/login">Login</Nav.Link>
			            			<Nav.Link as={Link} to="/register">Register</Nav.Link>
			            		</>
			            }
			            </Nav>
			        </Navbar.Collapse>
			    </Container>
			</Navbar>

		)

}