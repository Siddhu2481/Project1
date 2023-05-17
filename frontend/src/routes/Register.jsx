import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { FormContainer, Loader } from '../components/index';
import { register } from '../redux/actions/userActions';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        console.log(redirect)
        if (userInfo) {
            navigate(redirect)
        }
      }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Password do not match');
        } else {
            dispatch(register(name, email, password));
        }

    }

 
  return (
    <FormContainer>
        <h1>Sign Up</h1>
        {message && <p>{message}</p>}
        {error && <h3>{error}</h3>}
        {loading && <Loader />}
        <form onSubmit={submitHandler}>
            <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <div className="app__form-buttons">
                <button className='btn-primary'>Register</button>
                <Link className='btn-primary' to={redirect ? `/signIn?redirect=${redirect}` : '/signIn'}>Login</Link>
            </div>
        </form>
    </FormContainer>
  )
}

export default Register