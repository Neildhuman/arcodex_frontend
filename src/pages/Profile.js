import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from "sweetalert2";
import UserContext from '../UserContext';
import OrderHistory from '../components/OrderHistory'; // Import the OrderHistory component

export default function Profile() {
    const { user } = useContext(UserContext);
    console.log(user);

    const [details, setDetails] = useState({});

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (typeof data.user._id !== "undefined") {
                    setDetails(data.user);
                } else if (data.error === "User not found") {
                    Swal.fire({
                        title: "User not found",
                        icon: "error",
                        text: "Something went wrong, kindly contact us for assistance."
                    });
                } else {
                    Swal.fire({
                        title: "Something went wrong",
                        icon: "error",
                        text: "Something went wrong, kindly contact us for assistance."
                    });
                }
            });
    }, []);

    return (
        (user.id === null) ?
            <Navigate to="/products" />
            :
            <>
                <Row>
                    <Col className="p-5 bg-primary text-white">
                        <h1 className="my-5">Welcome to Your Profile</h1>
                        <h2 className="mt-3">{`${details.firstName} ${details.lastName}`}</h2>
                        <hr />
                        <h4>Contact Information</h4>
                        <ul>
                            <li>Email: {details.email}</li>
                            <li>Phone: {details.mobileNo}</li>
                        </ul>
                    </Col>
                </Row>

                {/* Display OrderHistory component */}
                <Row className="pt-4 mt-4 mb-5">
                    <Col>
                        <OrderHistory />
                    </Col>
                </Row>
            </>
    );
}
