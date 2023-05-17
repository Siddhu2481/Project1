import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { listProductDetails } from '../../redux/actions/productActions';
import Loader from '../../components/Loader/Loader';

import './Details.scss';

const Details = () => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let params = useParams();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(params.id))
  }, [dispatch]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  }

  return (
    <>
    {loading ? ( <Loader /> ) : error ? ( <h2>{error}</h2>) : (
      <div className='app__productDetails-container'>
      <img src={product.image} alt={product.name} />

      <div className="app__productDetails-container-content">
        <h2>{product.name}</h2>
        <p>Price: <span className='bold'>${product.price}</span></p>
        <p>Reviews: 4 x</p>
        <p>{product.description}</p>
        <div className="app__productDetails-quantity">
          <p>Quantity: </p>
          {product.countInStock > 0 && (
          <select value={qty} onChange={(e) => setQty(e.target.value)}>
            {
              [...Array(product.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))
            }
          </select>
        )}
        </div>
        <button className='btn-primary' onClick={addToCartHandler}>Add to cart</button>
        <button className='btn-primary' onClick={() => navigate(-1)} style={{marginLeft: '1rem'}}>Go Back</button>
      </div>
      </div>
    )}
    </>
    )
}

export default Details