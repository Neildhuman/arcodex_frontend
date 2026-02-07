import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from "../UserContext";
import Checkout from "../components/Checkout";

import axios from "axios"; // Import Axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import '../App.css'; 

import img from "../images/illustration-cover-retrogaming.png";

import ProductCard from "../components/ProductCard";


const Cart = () => {
    const [userCart, setUserCart] = useState([]);
    const [selectedProductIds, setSelectedProductIds] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const { productId } = useParams();

    useEffect(() => {
        const fetchProductData = () => {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setProducts(data.products);
            })
            .catch(error => {
                console.error("Error fetching product data:", error);
            });
        };
    
        fetchProductData();
    }, [productId]); // Empty dependency array to ensure it runs only once
    

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setUserCart(data.userCart[0].cartItems);
            })
            .catch((error) => {
                console.error("Error fetching cart data:", error);
            });
    }, []);

    console.log(userCart);

    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        setSelectedProductIds(selectAll ? [] : userCart.map((item) => item.productId));
    };

    const toggleProductSelection = (productId) => {
        setSelectedProductIds((prevSelected) => {
            if (prevSelected.includes(productId)) {
                return prevSelected.filter((id) => id !== productId);
            } else {
                return [...prevSelected, productId];
            }
        });
    };

    const handleRemoveItem = async (productId) => {
        try {
          // Make a DELETE request to remove the product from the cart
          await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/cart/${productId}/removeFromCart`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
    
          // Update the local state after successful removal
          const updatedCart = userCart.filter((item) => item.productId !== productId);
          setUserCart(updatedCart);
          setSelectedProductIds((prevSelected) => prevSelected.filter((id) => id !== productId));
        } catch (error) {
          console.error('Error removing product from cart:', error);
          // Handle errors or display appropriate messages to the user
        }
      };

    const handleUpdateQuantity = (productId, newQuantity) => {
        const updatedCart = userCart.map((item) => {
            if (item.productId === productId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setUserCart(updatedCart);
    };

    const handleClearCart = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/cart/clearCart`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setUserCart([]);
            setSelectedProductIds([]);
            setSelectAll(false);
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    const createOrder = async () => {
        try {
          // Group selected items by productId
          const groupedItems = selectedProductIds.reduce((grouped, productId) => {
            const selectedItem = userCart.find((item) => item.productId === productId);
            if (selectedItem) {
              if (!grouped[selectedItem.productId]) {
                grouped[selectedItem.productId] = {
                  productId: selectedItem.productId,
                  quantity: selectedItem.quantity,
                  subtotal: selectedItem.subtotal,
                };
              } else {
                grouped[selectedItem.productId].quantity += selectedItem.quantity;
                grouped[selectedItem.productId].subtotal += selectedItem.subtotal;
              }
            }
            return grouped;
          }, {});
    
          const groupedItemsArray = Object.values(groupedItems);
    
          const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/orders/checkout`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              selectedProductIds: selectAll ? [] : selectedProductIds,
              selectAll: selectAll,
              groupedItems: groupedItemsArray,
            }),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const data = await response.json();
          console.log("Order created successfully:", data);
    
          // Redirect to the OrderHistory page
          navigate("/place-order");
        } catch (error) {
          console.error("Error creating order:", error);
          // Handle errors or display appropriate messages to the user
        }
      };

    return (
        <Container className="mt-5">
            <h2>Your Cart</h2>
            {userCart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <Row>
                        {userCart.map((cartItem) => (
                            <Col key={cartItem.productId} md={4} className="my-3">
                                <Card>
                                    <Card.Body className="d-flex flex-column">
                                        <img src={img} className="h-100 w-100 mb-3" />
                                        <Card.Title>Product ID: {cartItem.productId}</Card.Title>
                                        {/* <Card.Title>Name: {products?.name}</Card.Title> */}
                                        <Card.Title>Name:</Card.Title>
                                        <Card.Subtitle>Quantity: 
                                            <Form.Control 
                                                type="number"
                                                value={cartItem.quantity}
                                                min="1"
                                                onChange={(e) => handleUpdateQuantity(cartItem.productId, parseInt(e.target.value))}
                                                style={{ width: '80px', display: 'inline', marginLeft: '10px' }}
                                            />
                                        </Card.Subtitle>
                                        <Card.Text>Price: PhP {cartItem.subtotal}</Card.Text>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div
                                                className="garbage-can-icon"
                                                onClick={() => handleRemoveItem(cartItem.productId)}
                                                >
                                                <FontAwesomeIcon icon={faTrash} size="1x" />
                                            </div>
                                            <Form.Check 
                                                type="checkbox" 
                                                label="Select for Checkout" 
                                                checked={selectedProductIds.includes(cartItem.productId)}
                                                onChange={() => toggleProductSelection(cartItem.productId)}
                                            />
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className="mt-3 d-flex gap-3">
                        <Button variant="warning" onClick={handleClearCart}>
                            <FontAwesomeIcon icon={faTrash} /> Clear Cart
                        </Button>
                        <Link to="/products" className="btn btn-primary">
                            Continue Shopping
                        </Link>
                    </div>
                    <div className="mt-3">
                        <Form.Check
                            type="checkbox"
                            label="Select All"
                            checked={selectAll}
                            onChange={toggleSelectAll}
                        />
                    </div>
                    {selectedProductIds.length > 0 && (
                        <div className="mt-3">
                            <Checkout userCart={userCart} selectedProductIds={selectedProductIds} createOrder={createOrder} />
                        </div>
                    )}
                </>
            )}
        </Container>
    );
};

export default Cart;
