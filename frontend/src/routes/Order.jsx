import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components';
import { getOrderDetails, payOrder } from '../redux/actions/orderActions';
import { ORDER_PAY_RESET } from '../redux/constants/orderConstants';

import './PlaceOrder.scss';
import './Order.scss';

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const orderId = params.id;
  
  const [sdkReady, setSdkReady] = useState(false);
  
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;   

  if(!loading){
    const formatPrices = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
      };
    
      order.itemsPrice = formatPrices(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0));     
  }

    useEffect(() => {
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            console.log(clientId);

            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script);
        }

        if(!order || successPay){
            dispatch({ type: ORDER_PAY_RESET })
            if(!order || order._id !== orderId) {
                dispatch(getOrderDetails(orderId));
            }
        } else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, successPay, order, orderId]) 

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);
        dispatch(payOrder(orderId, paymentResult));
    } 

  return loading ? (
    <Loader /> ) : (
    <div className='app__order container'>
        <div className="app__placeorder-shipping">
            <h2>Shipping</h2>
            <p><span className='bold'>Order Id: </span>{order._id}</p>
            <p><span className='bold'>Name: </span>{order.user.name} </p> 
            <p><span className='bold'>Email: </span> <a href={`mailto: ${order.user.email}`}>{order.user.email}</a></p>
            <p><span className='bold'>Adress:</span> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
        </div>
        <div className="app__placeorder-method">
            <h2>Payment Method</h2>
            <p><span className='bold'>Method:</span> {order.paymentMethod}</p>
        </div>
        <div className="app__placeorder-items">
            <h2>Order Items</h2>
            {order.orderItems.length === 0 ? alert('Order is empty') : (
                <div className="app__placeorder-items-list">
                    {order.orderItems.map((item, index) => (
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
                <p>Price: ${order.itemsPrice}</p>
                <p>Shipping: ${order.shippingPrice}</p>
                <p>Total: ${order.totalPrice}</p>
            </div>
        </div> 
        <div className="app__paypal">
            {!order.isPaid && (
                <>
                    {loadingPay && <Loader /> }
                    {!sdkReady ? <Loader /> : (
                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                    )}
                </>
            )}
        </div>
    </div>
  )
}

export default Order