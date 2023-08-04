import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProduct } from '../redux/actions/product.js';
import { useParams } from 'react-router-dom';
import { api, apiUrl, endpoints } from '../utils/api.js';

const ProductDetail = () => {
  const { _id } = useParams()
  const dispatch = useDispatch();

  const product = useSelector(state => state.product.product)

  const fetchProductDetail = async () => {
    try {
      const { data } = await api.get(apiUrl + endpoints.audiovideo + "64cc6c825de73f500154d306")
      dispatch(setProduct(data.product))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProductDetail()
  }, [dispatch, _id])

  console.log(product)
  return (
    <div>
      <h1>Product Detail</h1>
      {product && product.title && (
        <p>{product.title}</p>
      )}
      <button onClick={() => fetchProductDetail()}>
        Fetch Product Detail
      </button>
    </div>
  );
};

export default ProductDetail;

