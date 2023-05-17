import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { FormContainer, Loader } from '../components/index';
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions';
import { listMyOrders } from '../redux/actions/orderActions'; 

import './Profile.scss';

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile  = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const orderListMy = useSelector(state => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if(!user.name) {
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
      }, [dispatch, navigate, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Password do not match');
        } else {
            dispatch(updateUserProfile({ id: user.id, name, email, password }))
        }
    }
 
  return (
    <div className='app__profile container'>
        <div className="app__profile-form">
            <h1>User Profile</h1>
            {message && <p>{message}</p>}
            {error && alert({error})}
            {success && alert('User Updated')}
            {loading && <Loader />}
            <form onSubmit={submitHandler}>
                <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                <div className="app__form-buttons">
                    <button className='btn-primary'>Update</button>
                </div>

            </form>
        </div>
        <div className="app__profile-orders">
            <h2>My Orders</h2>
            <div className="app__profile-orders-list">
            {loadingOrders ? <Loader /> : (
                <>
                {orders.map(order => (
                    <div className="app__profile-order">
                        <p><span className='bold'>Order ID:</span> {order._id}</p>
                        <p><span className='bold'>Date:</span> {order.createdAt.substring(0, 10)}</p>
                        <p><span className='bold'>Price:</span> ${order.totalPrice}</p>
                    </div>
                ))}
                </>
            )}
            </div>

        </div>
    </div>
  )
}

export default Profile