import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FormContainer } from '../components/index';
import { saveShippingAddress } from '../redux/actions/cartActions';

const Shipping = () => {
  const navigate = useNavigate();

  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');  
}

  return (
    <div className='app__shipping container'>
        <FormContainer>
        <h1>Shipping</h1>
        <form onSubmit={submitHandler}>
            <input type="text" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)}  required/>
            <input type="text" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} required/>
            <input type="text" placeholder='Postal Code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required/>
            <input type="text" placeholder='country' value={country} onChange={(e) => setCountry(e.target.value)} required/>
            <div className="app__form-buttons">
                <button className='btn-primary'>Continue</button>
            </div>
        </form>
    </FormContainer>
    </div>
  )
}

export default Shipping