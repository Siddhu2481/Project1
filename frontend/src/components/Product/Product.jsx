import React from 'react';
import { Link } from 'react-router-dom';

import './Product.scss';

const Product = ({ product }) => {
  return (
    <div className='app__home-products-box'>
      <Link to={`${`/products/${product._id}`}`}>
        <img src={product.image} alt={product._id} />
      </Link>
      <div className="app__home-products-box-content">
        <p>{product.name}</p>
        <p>{product.price}</p>
      </div>
    </div>
  )
}

export default Product