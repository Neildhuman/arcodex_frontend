// OrderHistory.js

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/my-orders`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setOrderHistory(data.orders);
      } catch (error) {
        console.error("Error fetching order history:", error);
        // Handle errors or display appropriate messages to the user
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <Container className="mt-5">
      <h2>Order History</h2>
      {orderHistory.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Row>
          {orderHistory.map((order) => (
            <Col key={order._id} md={4} className="mb-3">
              <Card>
                <Card.Body>
                  <Card.Title>Order ID: {order._id}</Card.Title>
                  <Card.Subtitle>Date: {new Date(order.orderedOn).toLocaleDateString()}</Card.Subtitle>
                  <Card.Text>Total Price: PhP {order.totalPrice}</Card.Text>
                  <h5>Ordered Items:</h5>
                  {order.productsOrdered ? (
                    <ul>
                      {order.productsOrdered.map((item) => (
                        <li key={item.productId}>
                          Product ID: {item.productId} - Quantity: {item.quantity} - Subtotal: PhP {item.subtotal}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No items in this order.</p>
                  )}
                  {/* Add more details as needed */}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default OrderHistory;
