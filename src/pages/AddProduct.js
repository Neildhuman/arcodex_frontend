import { useState, useContext } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddProduct() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [error, setError] = useState('');

    const createProduct = async (e) => {
        e.preventDefault();
        if (!user.isAdmin) {
            Swal.fire('Error', 'You are not authorized to add products.', 'error');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    name,
                    description,
                    price: parseFloat(price),
                    inventoryStock: parseInt(stock)
                })
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire('Success', 'Product added successfully!', 'success');
                navigate('/products');
            } else {
                throw new Error(data.error || 'Failed to add product.');
            }
        } catch (err) {
            setError(err.message);
            Swal.fire('Error', err.message, 'error');
        }
    };

    return (
        <Container>
            <h2>Add Product</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={createProduct}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}
