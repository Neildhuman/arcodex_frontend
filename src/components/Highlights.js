import { Carousel, Row, Col, Image, Accordion } from "react-bootstrap";
import img1 from "../images/bf52bf1dad9831e086cb8f8bb8ac77b8.jpg";
import img2 from "../images/9be0cfcd522621c492c085102e867e03.jpg";
import img3 from "../images/d755615e373dab2bcb23df38722eed6b.jpg";

export default function Highlights(){

	return(
        <Row>
            <Col xs={12} lg={12}>
                <Carousel>
                    <Carousel.Item>
                        <img 
                            className="w-100"
                            src={img1}
                        />
                        <Carousel.Caption>
                        <h3 className="hlights">Retro Games</h3>
                        <p className="hlights">Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img 
                            className="w-100"
                            src={img2}
                        />
                        <Carousel.Caption>
                        <h3 className="hlights">Gaming Consoles</h3>
                        <p className="hlights">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img 
                            className="w-100"
                            src={img3}
                        />
                        <Carousel.Caption>
                        <h3 className="hlights">Merch</h3>
                        <p className="hlights">
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Col>

            <Col xs={12} lg={12}>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Retro Games</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Video Games</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Join the Community</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Col>
        </Row>
	)

}