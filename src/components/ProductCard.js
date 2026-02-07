import { useContext, useEffect, useState } from "react";
import { Card, Button, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
// import Add

import '../App.css'

export default function ProductCard({ productProp }) {

  const { _id, name, description, price, inventoryStock, isActive } = productProp;
  const { user } = useContext(UserContext);
  return (
    <Card style={{ width: '18rem' }} className="cards">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>Description:</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Price:</Card.Subtitle>
        <Card.Text>PhP {price}</Card.Text>
        <Card.Text>Stock: {inventoryStock}</Card.Text>
        <Card.Text className={isActive ? "text-success" : "text-danger"}>
          <strong>{isActive ? "Available" : "Unavailable"}</strong>
        </Card.Text>
        <Link className="btn btn-primary" to={`/products/${_id}`}>
          Details
        </Link>
		{/* {
			(user.id !== null) ?
				<Button variant="primary" block="true" onClick={() => addToCart(productId)}>Add to Cart</Button>
			:
				<Link className="btn btn-danger btn-block" to="/login">Login to Enroll</Link>
		} */}
      </Card.Body>
    </Card>
  );
}
