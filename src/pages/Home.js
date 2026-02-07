import Banner from "../components/Banner";
import Highlights from "../components/Highlights";
import FeaturedProducts from "../components/FeaturedProducts";

import {Container, Row, Col} from "react-bootstrap"
import "../App.css"

export default function Home() {

    const data = {
        title: "ARCODEX",
        content: "Your one stop retro games store!",
        destination: "/products",
        label: "Start shopping with us!"
    }

    return (
        <>
        <Container>
            <Banner data={data} />
            <Container>
                <Col className="mb-5">
                    <FeaturedProducts />
                </Col>
                <Col>
                    <Highlights />
                </Col>
            </Container>
        </Container>
        </>
    )
}