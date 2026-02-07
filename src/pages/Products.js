import { useContext, useEffect, useState } from "react";
import ProductCard from '../components/ProductCard';
import UserContext from '../UserContext';

import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Products(){

	const { user } = useContext(UserContext);

	// console.log(user)

	const [products, setProducts] = useState([]);

	const fetchData = () => {

		let fetchUrl = user.isAdmin === true ? `${process.env.REACT_APP_API_BASE_URL}/products/all
		` : `${process.env.REACT_APP_API_BASE_URL}/products/active`

		fetch(fetchUrl, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			// console.log("API Response:", data);
			// console.log(data);
			// console.log(typeof data.message);

			if(typeof data.message !== "string"){
				setProducts(data.product);
			} else {
				setProducts([]);
			}

		})
	}

	useEffect(() => {

		fetchData()

	}, [fetchData])

	return(

			<> 
				{
					user.isAdmin ? 
						<AdminView productsInfo={products} fetchData={fetchData}/>

					:

						<UserView productsInfo={products} />
				}
			</>
		)
}