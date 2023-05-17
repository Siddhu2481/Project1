import React, { useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/actions/cartActions';

import { FaTrash } from 'react-icons/fa';
import './Cart.scss';

const Cart = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  console.log(cartItems);

  useEffect(() => {
    if(params.id) {
      dispatch(addToCart(params.id, qty))
    }
  }, [dispatch, params.id, qty]);

  console.log(qty);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }

  const checkoutHandler = () => {
    navigate('/shipping')
  }

  return (
    <div className='app__cart container'>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? alert(`Your cart is empty ${<Link className='btn-primary' to='/'>Go Back</Link>}`) : (
        <div className="app__cart-items">
          {cartItems.map((item, index) => (
            <div className="app__cart-item" key={index}>
              <Link to={`/products/${item.product}`}>
                <img src={item.image} alt={item.name} />
              </Link>
              <div className="app__cart-item-info">
                <p>{item.name}</p>
                <p>${item.price}</p>
                <button className='btn-primary' onClick={() => removeFromCartHandler(item.product)}><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="app__cart-bill">
        <h3>{cartItems.reduce((acc, item) => acc + item.qty, 0)} items</h3>
        <div className="app__cart-bill-value">
          <h3>Total Value:</h3>
          <p>${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</p>
        </div>
        <button className="btn-primary" disabled={cartItems.length === 0} onClick={checkoutHandler}>Checkout</button>
      </div>
    </div>
  )
}

export default Cart