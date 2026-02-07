// Checkout.js

import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Checkout = ({ userCart, selectedProductIds, createOrder }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedProductIds.length > 0) {
      const items = userCart.filter((item) => selectedProductIds.includes(item.productId));
      setSelectedItems(items);
      const total = items.reduce((acc, curr) => acc + curr.subtotal, 0);
      setTotalPrice(total);
    } else {
      setSelectedItems([]);
      setTotalPrice(0);
    }
  }, [selectedProductIds, userCart]);

  const handleCheckout = () => {
    createOrder(selectedItems);
    navigate=("/place-order");
  };

  return (
    <Container className="mt-5">
      <h2>Checkout</h2>
      {selectedItems.length === 0 ? (
        <p>Your order summary is empty.</p>
      ) : (
        <>
          <div>
            <h4>Order Summary:</h4>
            <ul>
              {selectedItems.map((cartItem) => (
                <li key={cartItem.productId}>
                  Product ID: {cartItem.productId} - Quantity: {cartItem.quantity} - Subtotal: PhP {cartItem.subtotal}
                </li>
              ))}
            </ul>
            <p>Total Price: PhP {totalPrice}</p>
          </div>
          <div className="mt-3">
            <Button variant="success" onClick={handleCheckout}>
              Place Order
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Checkout;
