import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product, Loader } from '../../components';
import { listProducts } from '../../redux/actions/productActions';

import './Products.scss';

const Products = () => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
      <div className="app__home-products container">
        {loading ? (
          <Loader />
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
          {products.map((product) => (
            <Product product={product}/>
          ))}
          </>
        )}

      </div>
  )
}

export default Products