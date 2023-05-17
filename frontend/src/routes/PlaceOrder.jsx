import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../redux/actions/orderActions';

import './PlaceOrder.scss';

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);

  const formatPrices = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = formatPrices(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
  cart.shippingPrice = formatPrices(cart.itemsPrice > 100 ? 0 : 100);
  cart.totalPrice = formatPrices(Number(cart.itemsPrice) + Number(cart.shippingPrice));

  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success } = orderCreate;

  useEffect(() => {
    if(success) {
        navigate(`/order/${order._id}`)
    }
    // eslint-disable-next-line 
  }, [navigate, success]);

  const placeOrderHandler = () => {
    dispatch(createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice
    }))
  }

  return (
    <div className='app__placeorder container'>
        <div className="app__placeorder-shipping">
            <h2>Shipping</h2>
            <p><span className='bold'>Adress:</span> {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
        </div>
        <div className="app__placeorder-method">
            <h2>Payment Method</h2>
            <p><span className='bold'>Method:</span> {cart.paymentMethod}</p>
        </div>
        <div className="app__placeorder-items">
            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? alert('Your Cart is empty') : (
                <div className="app__placeorder-items-list">
                    {cart.cartItems.map((item, index) => (
                        <Link to={`/product/${item.product}`}>
                        <div className="app__placeorder-item" key={index}>
                            <img src={item.image} alt={item.name} />
                            <div className="app__placeorder-item-info">
                                    <p>{item.name}</p>
                                <p>{item.qty} x ${item.price} = ${item.qty * item.price}</p>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
        <div className="app__placeorder-orders">
            <h2>Order Summary</h2>
            <div className="app__placeorder-orders-info">
                <p>Price: ${cart.itemsPrice}</p>
                <p>Shipping: ${cart.shippingPrice}</p>
                <p>Total: ${cart.totalPrice}</p>
            </div>
        </div>
        <div className="app__placeord-button">
            <button type='button' className='btn-primary' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>Place Order</button>
        </div>
    </div>
  )
}

export default PlaceOrder