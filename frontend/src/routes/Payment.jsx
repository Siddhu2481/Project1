import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormContainer } from '../components/index';
import { savePaymentMethod } from '../redux/actions/cartActions';

import './Payment.scss';

const Payment = () => {
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if(!shippingAddress) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');  
}

  return (
    <div className='app__payment container'>
        <FormContainer>
        <h1>Payment Method</h1>
        <form onSubmit={submitHandler}>
            <div className="app__payment-paypal">
                <input type="radio" name="paymentMethod" value="Paypal" checked onChange={(e) => setPaymentMethod(e.target.value)} id="PayPal" />
                <label for="PayPal">Paypal or Credit Card</label>
            </div>
            <div className="app__form-buttons">
                <button className='btn-primary'>Continue</button>
            </div>
        </form>
    </FormContainer>
    </div>
  )
}

export default Payment