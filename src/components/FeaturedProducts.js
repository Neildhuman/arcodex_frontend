import { useEffect, useState } from "react";
import { CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import PreviewProducts from "./PreviewProducts";

export default function FeaturedProducts(){

	const [previews, setPreviews] = useState([]);

	useEffect(() => {

		fetch(`${process.env.REACT_APP_API_BASE_URL}/products/all`)
			.then(res => res.json())
			.then(data => {

				console.log(data);
				console.log(data.product);
				console.log(data.product.length);

                const numbers = [];
				const featured = [];

                const generateRandomNums = () => {

					let randomNum = Math.floor(Math.random() * data.product.length);

					if(numbers.indexOf(randomNum) === -1){
						numbers.push(randomNum);
					} else {
						generateRandomNums();
					}

				}

				for(let i = 0; i < 3; i++){

					generateRandomNums();

					featured.push(
						<PreviewProducts data={data.product[numbers[i]]} key={data.product[numbers[i]]._id} breakPoint={4} />
					)

				}

				setPreviews(featured);

			})

	}, []);

	return(

			<>
				<h2 className="text-center">Featured Products</h2>
				<CardGroup className="justify-content-center">
					
					{ previews }

				</CardGroup>
			</>

		)

}