import { Container, Row, Col } from "react-bootstrap";
import { Link } from 'react-router-dom';

import "../App.css"

export default function Banner({ data }) {

	console.log(data);

    const { title, content, destination, label } = data;

    return (
    <Container className="banner1 my-3">
        <Row>
            <Col className="p-5 text-center banner2">
            <div class="glitch-wrapper">
             <div class="glitch" data-glitch="ARCODEX">ARCODEX</div>
            </div>
                {/* <h1></h1> */}
                <p>{ content }</p>
                <Link className="btn mt-3" to={ destination }>{ label }</Link>
            </Col>
        </Row>
    </Container>
    )
}