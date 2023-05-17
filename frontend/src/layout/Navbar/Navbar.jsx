import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userActions';

import { IoCart, IoCloseOutline } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import './Navbar.scss';

const Navbar = () => { 
  const dispatch = useDispatch();

  const [menu, setMenu] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  }

  const toggleMenu = () => {
    setMenu(!menu);
  }

  const closeMenu = () => {
    setMenu(false);
  }

  return (
    <nav className='app__nav container'>
        <div className="app__nav-logo">
            <Link to='/'>
                <h3>Clothing</h3>
            </Link>
        </div>

        <div className="app__nav-auth">
            <div><IoCart /><Link to='/cart'>Cart</Link></div>
            {userInfo ? (
                <div class="dropdown">
                    <button className="btn-primary" for="btnControl">{userInfo.name}</button>
                    <div class="dropdown-content">
                        <Link to='/profile' onClick={closeMenu}>Profile</Link>
                        <Link to='/' onClick={logoutHandler}>Logout</Link>
                        {userInfo && userInfo.isAdmin && (
                            <Link to='/admin/dashboard'>Dashboard</Link>
                        )} 
                    </div>
                </div>
            ) : <div><FaUser /><Link to='/signIn'>Sign In</Link></div>}
        </div>

        <div className="app__nav-mobile">
            <div className="app__nav-mobile-icon" onClick={toggleMenu}>
                {menu ? <IoCloseOutline size={24}/> : <FiMenu size={24}/>}
            </div>

            {menu && (
                <div className="app__nav-mobile-menu scale-up-center">
                    <div className="app__nav-mobile-auth">
                        <div><IoCart /><Link to='/cart' onClick={closeMenu}>Cart</Link></div>
                        {userInfo ? (
                        <div class="dropdown">
                           <button class="dropbtn" for="btnControl">{userInfo.name}</button>
                           <div class="dropdown-content">
                             <Link to='/profile' onClick={closeMenu}>Profile</Link>
                             <Link to='/' onClick={logoutHandler}>Logout</Link>
                             {userInfo && userInfo.isAdmin && (
                                <Link to='/admin/dashboard' onClick={closeMenu}>Dashboard</Link>
                             )} 
                           </div>
                        </div>
                        ) : <div><FaUser /><Link to='/signIn' onClick={closeMenu}>Sign In</Link></div>}
                    </div>
                    <div className="app__nav-mobile-search">
                        <input type="text" placeholder='Search'/>
                        <button className="btn-primary">Search</button>
                    </div>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar