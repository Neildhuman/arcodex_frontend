import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PlaceOrder = ({ location }) => {
  // const orderData = location.state.orderData;

  return (
    <Container className="mt-5">
      <h2>Thank you for ordering from us!</h2>
      <p>Have a great day!</p>
      <Link className="btn btn-primary" to={`/products`}>Continue Shopping</Link>
    </Container>
  );
};

export default PlaceOrder;
