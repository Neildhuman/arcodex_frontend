import React, { useState } from 'react';

import ProductCard from "./ProductCard";

import "../App.css"


const ProductSearch = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/searchByName`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
      });
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  return (
    <div className='prod-search p-3'>
      <h2>Product Search</h2>
      <div className="form-group">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          className="form-control"
          value={name}
          onChange={event => setName(event.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
      <h3>Search Results:</h3>
      <ul>
        {products.map(product => (
        	<ProductCard productProp={product} key={product._id}/>
        ))}
      </ul>
    </div>
  );
};

export default ProductSearch;
