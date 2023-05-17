import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, updateProduct } from '../redux/actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../redux/constants/productConstants';

import './ProductEdit.scss';

const ProductEdit = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productId = params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  
  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;  

  useEffect(() => {
    if(successUpdate){
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate('/admin/dashboard');
    } else {
      if(!product.name || product._id !== productId){
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setStock(product.stock);
        setDescription(product.description);
    }
    }
  }, [dispatch, navigate, productId, product, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      stock,
      description
    }));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  }


  return (
    <div className='app__product-edit container'>
        <form onSubmit={submitHandler} className="app__product-edit-form">
          <h1>Update Product</h1>
            <input type="text" placeholder='Enter Name' value={name} onChange = {(e) => setName(e.target.value)}/>
            <input type="number" placeholder='Enter Price' value={price} onChange = {(e) => setPrice(e.target.value)}/>
            <div className="app__product-edit-form-image">
              <input type="text" placeholder='Enter Image' value={image} onChange = {(e) => setImage(e.target.value)}/>
              <input type="file" id="image-file" custom onChange={uploadFileHandler}/>
            </div>
            <input type="text" placeholder='Enter Brand' value={brand} onChange = {(e) => setBrand(e.target.value)}/>
            <input type="text" placeholder='Enter Category' value={category} onChange = {(e) => setCategory(e.target.value)}/>
            <input type="number" placeholder='Enter Stock' value={stock} onChange = {(e) => setStock(e.target.value)}/>
            <input type="text" placeholder='Enter Description' value={description} onChange = {(e) => setDescription(e.target.value)}/>
            <div className="app__product-edit-form-button">
                <button type='submit' className="btn-primary">
                    Update Product
                </button>
            </div>
        </form>
    </div>
  )
}

export default ProductEdit