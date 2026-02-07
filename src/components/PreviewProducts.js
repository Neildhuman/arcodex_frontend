import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function PreviewProducts(props){

	// props is used here to get the data and breakPoint from the FeaturedCourses.js
	const { data, breakPoint } = props;

	console.log(data);

	const { _id, name, description, price, isActive } = data;

	return(

			<Col xs={12} md={ breakPoint }>
				<Card className="cardHighlight m-2">
				    <Card.Body>
				        <Card.Title className="text-center">
				            <Link to={`/products/${_id}`}>{ name }</Link>
				        </Card.Title>

				        <Card.Text className="text-center">
				            { description }
                            <h5 className="text-center">Php { price }</h5>
				        </Card.Text>

						{/* <Card.Text className={isActive ? "text-success" : "text-danger"}>
							<strong>{isActive ? "Available" : "Unavailable"}</strong>
						</Card.Text> */}
				    </Card.Body>

				    <Card.Footer>
				        <Link className="btn btn-primary d-block" to={`/products/${_id}`}>Details</Link>
				    </Card.Footer>
				</Card>
			</Col>

		)

}