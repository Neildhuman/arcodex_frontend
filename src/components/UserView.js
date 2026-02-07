import React, { useState, useEffect } from 'react';
import {Container, Col, Row} from "react-bootstrap";

import ProductCard from './ProductCard';
import ProductSearch from "./ProductSearch";
import SearchByPrice from "./SearchByPrice";

import "../App.css"


export default function UserView({productsInfo}) {

	const [products, setProducts] = useState([])

	useEffect(() => {
		// console.log(productsInfo);

		if (productsInfo && Array.isArray(productsInfo)) {
		const productsArr = productsInfo.map(product => {
			//only render the active courses
			if(product.isActive === true) {
				return (
					<ProductCard productProp={product} key={product._id}/>
					)
			} else {
				return null;
			}
		})

		//set the courses state to the result of our map function, to bring our returned course component outside of the scope of our useEffect where our return statement below can see.
		setProducts(productsArr)

	} else {
		// Handle the case when productsInfo is not an array or undefined
		setProducts([]);
	}
	
	}, [productsInfo])

	return(
		<>
		<Container className='p-3 product-page bg-light'>
				<div className='side-nav col-3'>
					<ProductSearch />
					<SearchByPrice />
				</div>
				<div className='prod-cards col-9'>
					{ products }
				</div>
		</Container>
		</>
		)
}