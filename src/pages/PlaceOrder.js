// PlaceOrder.js

import React from "react";
import { Container } from "react-bootstrap";

const PlaceOrder = ({ location }) => {
  const orderData = location && location.state && location.state.orderData;

  return (
    <Container className="mt-5">
      <h2>Place Order</h2>
      {orderData ? (
        <div>
          <p>Order placed successfully! Order ID: {orderData.orderId}</p>
          <h4>Ordered Items:</h4>
          <ul>
            {orderData.items.map((item) => (
              <li key={item.productId}>
                Product ID: {item.productId} - Quantity: {item.quantity} - Subtotal: PhP {item.subtotal}
              </li>
            ))}
          </ul>
          <p>Total Amount: PhP {orderData.totalAmount}</p>
        </div>
      ) : (
        <p>Your order details are not available.</p>
      )}
    </Container>
  );
};

export default PlaceOrder;
