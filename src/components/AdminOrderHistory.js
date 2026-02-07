import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const AdminOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/all-orders`, {
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
      <h2>Admin Order History</h2>
      {orderHistory.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <Row>
          {orderHistory.map((order) => (
            <Col key={order._id} md={4} className="mb-3">
              <Card>
                <Card.Header>
                  Order ID: {order._id} - User: {order.userId}
                </Card.Header>
                <Card.Body>
                  <Card.Subtitle>Date: {new Date(order.orderedOn).toLocaleDateString()}</Card.Subtitle>
                  <Card.Text>Total Price: PhP {order.totalPrice}</Card.Text>
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

export default AdminOrderHistory;
