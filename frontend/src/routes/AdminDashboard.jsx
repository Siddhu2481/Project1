import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../redux/actions/userActions';
import { listProducts, deleteProduct, createProduct } from '../redux/actions/productActions';
import { listOrders } from '../redux/actions/orderActions';
import { PRODUCT_CREATE_RESET } from '../redux/constants/productConstants';
import { Loader } from '../components';

import './AdminDashboard.scss';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector(state => state.userDelete);
  const { success: userSuccessDelete } = userDelete;

  const productList = useSelector(state => state.productList);
  const { products } = productList;

  const productDelete = useSelector(state => state.productDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

  const productCreate = useSelector(state => state.productCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

  const orderList = useSelector(state => state.orderList);
  const { loading: orderLoading, error: orderError, orders } = orderList;

  // List users
  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch, userSuccessDelete]);

  // Delete User
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  }

  // List Products
  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if(successCreate){
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts())
    }

  }, [ dispatch, successDelete, successCreate, createdProduct ]);

  // Delete Product
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  }

  // create product
  const createProductHandler = () => {
    dispatch(createProduct());
  }

  // List Orders
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  return (
    <div className='app__dashboard container'>
      <div className="app__dashboard-container">
        <h1>Users List</h1>
        {loading ? <Loader /> : error ? alert('Error') : (
            <div className="app__dashboard-list">
                {users.map(user => (
                  <>
                    <div className='app__dashboard-list-item'>
                        <p><span className='bold'>Name:</span> {user.name}</p>
                        <p><span className='bold'>Email:</span> {user.email}</p>                      
                        <button className='btn-primary' onClick={() => deleteUserHandler(user._id)}>
                            Delete User
                        </button>
                    </div>
                    <hr />
                    </>
                ))}
            </div>
        )}
      </div>
      <div className="app__dashboard-container">
        <h1>Products</h1>
        <div className="app__dashboard-createBtn">
          <button className='btn-primary' onClick={createProductHandler}>
              Create Product
          </button>
        </div>
        {orderLoading ? <Loader /> : orderError ? alert('Error') : (
            <div className="app__dashboard-list">
                {products.map(product => (
                  <>
                    <div className='app__dashboard-list-item'>
                        <p><span className='bold'>Name:</span> {product.name}</p>
                        <p><span className='bold'>Price:</span> ${product.price}</p>
                        <p><span className='bold'>Category:</span> {product.category}</p>
                        <Link className='btn-primary' to={`/admin/product/${product._id}/edit`}>
                            Edit Product
                        </Link>
                        <button className='btn-primary' onClick={() => deleteProductHandler(product._id)}>
                            Delete Product
                        </button>
                    </div>
                    <hr />
                  </>
                ))}
            </div>
        )}
      </div>
      <div className="app__dashboard-container">
        <h1>Orders List</h1>
        {orderLoading ? <Loader /> : orderError ? alert('Error') : (
            <div className="app__dashboard-list">
                {orders.map(order => (
                  <>
                    <div className='app__dashboard-list-item'>
                        <p><span className='bold'>Id:</span> {order._id}</p>
                        {/* <p><span className='bold'>Name:</span> {order.user.name}</p> */}
                        <p><span className='bold'>Price:</span> ${order.totalPrice}</p>
                        <p><span className='bold'>Date:</span> {order.createdAt.substring(0, 10)}</p>
                    </div>
                    <hr />
                    </>
                ))}
            </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard;