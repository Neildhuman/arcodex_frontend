import { useContext, useEffect, useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function ProductView() {
    const { user } = useContext(UserContext);
    const { productId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [unitPrice, setUnitPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [inventoryStock, setInventoryStock] = useState(0);

    const addToCart = () => {
        if (quantity > inventoryStock) {
            Swal.fire("Not enough stock available", "", "error");
            return;
        }

        fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/addToCart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                cartItems: [{ productId, quantity }],
                totalPrice: totalPrice // Use calculated total price based on quantity
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.message === "Product added to cart successfully") { // Check the actual structure of your response
                Swal.fire("Success", "Product added to cart successfully", "success");
                navigate("/cart"); // Uncomment this if you want to redirect to the cart page
            } else {
                throw new Error(data.message || "Failed to add product to cart"); // Use your API's error message
            }
        })
        .catch(error => {
            Swal.fire("Error", error.toString(), "error");
        });
    };

    useEffect(() => {
        if (productId) {
            fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data && data.product) {
                    setName(data.product.name);
                    setDescription(data.product.description);
                    setUnitPrice(data.product.price);
                    setInventoryStock(data.product.inventoryStock);
                    setTotalPrice(data.product.price);
                } else {
                    Swal.fire("Error", "Product not found", "error");
                }
            })
            .catch(error => {
                Swal.fire("Error", "Failed to fetch product details", "error");
            });
        }
    }, [productId]);

    useEffect(() => {
        // Update total price whenever quantity changes
        setTotalPrice(unitPrice * quantity);
    }, [quantity, unitPrice]);

    return (
        <Container className="mt-5">
            <Row>
                <Col lg={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body className="text-center">
                            <Card.Title>{name}</Card.Title>
                            <Card.Subtitle>Description:</Card.Subtitle>
                            <Card.Text>{description}</Card.Text>
                            <Card.Subtitle>Price:</Card.Subtitle>
                            <Card.Text>PhP {totalPrice.toFixed(2)}</Card.Text>
                            <div className="quantity-container mb-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Button variant="outline-primary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
                                <span className="mx-3">{quantity}</span>
                                <Button variant="outline-primary" onClick={() => setQuantity(Math.min(quantity + 1, inventoryStock))}>+</Button>
                            </div>
                            
                            { user.id !== null ? 
                                <Button variant="primary" onClick={addToCart}>Add to Cart</Button>
                                : 
                                <Button variant="danger" type="submit" id="submitBtn" disabled>
                                    Login to add item in cart
                                </Button>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
