import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { FormContainer, Loader } from '../components/index';
import { login } from '../redux/actions/userActions';

const LogIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        console.log(redirect)
        if (userInfo) {
            navigate(redirect)
        }
      }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

 
  return (
    <FormContainer>
        <h1>Sign In</h1>
        {error && <h1>{error}</h1>}
        {loading && <Loader />}
        <form onSubmit={submitHandler}>
            <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <div className="app__form-buttons">
                <button className='btn-primary'>Sign In</button>
                <Link className='btn-primary' to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </div>

        </form>
    </FormContainer>
  )
}

export default LogIn