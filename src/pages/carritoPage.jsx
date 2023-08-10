import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productsActions from '../redux/actions/productsActions.js';

export default function CarritoPage() {
  const dispatch = useDispatch();
  const [cartProductIds, setCartProductIds] = useState([]);
  const [productCount, setProductCount] = useState({});

  useEffect(() => {
    dispatch(productsActions.read_products());
    const storedCartProductIds = JSON.parse(localStorage.getItem('product cart')) || [];
    const countObj = {};
    storedCartProductIds.forEach(id => {
      if (countObj[id]) {
        countObj[id]++;
      } else {
        countObj[id] = 1;
      }
    });
    setCartProductIds(storedCartProductIds);
    setProductCount(countObj);
  }, [dispatch]);

  const read_products = useSelector(store => store.products.products);

  const updateProductCount = (productId, newCount) => {
    if (newCount <= 0) {
      removeFromCart(productId);
    } else {
      const updatedCountObj = { ...productCount, [productId]: newCount };
      setProductCount(updatedCountObj);
      const updatedCart = [];
      for (const id in updatedCountObj) {
        for (let i = 0; i < updatedCountObj[id]; i++) {
          updatedCart.push(id);
        }
      }
      localStorage.setItem('product cart', JSON.stringify(updatedCart));
      setCartProductIds(updatedCart);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCountObj = { ...productCount };
    delete updatedCountObj[productId];
    setProductCount(updatedCountObj);
    const updatedCart = [];
    for (const id in updatedCountObj) {
      for (let i = 0; i < updatedCountObj[id]; i++) {
        updatedCart.push(id);
      }
    }
    localStorage.setItem('product cart', JSON.stringify(updatedCart));
    setCartProductIds(updatedCart);
  };

  const cartProducts = read_products.filter(product => cartProductIds.includes(product._id));

  return (
    <div className='bg-[#f0eeee] h-auto py-[3rem]'>
      <h2 className='ml-[2rem] text-[#5a5858] text-[1.3rem]'>Products in the cart:</h2>
      <div className="grid-cols-3 gap-4  flex flex-wrap justify-around mt-[2rem] px-[2rem]">
        {cartProducts.map(product => (
          <div key={product._id} className="bg-white rounded-lg shadow-md w-[20rem] px-[2rem] h-[23rem] py-[1.5rem]">
            <img src={product.cover_photo[0]} alt={product.title} className="w-full h-40 object-contain mb-2" />
            <p className="text-gray-500 mb-1">{product.title}</p>
            <p className="text-gray-800 text-lg mb-2">Total: UDS${product.price * productCount[product._id]}</p>
            <div className="flex items-center justify-between">
              <p className="text-red-500 font-semibold">Quantity: {productCount[product._id]}</p>
              <div className="flex items-center">
                <button
                  onClick={() => updateProductCount(product._id, productCount[product._id] - 1)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                >
                  -
                </button>
                <p className="mx-2">{productCount[product._id]}</p>
                <button
                  onClick={() => updateProductCount(product._id, productCount[product._id] + 1)}
                  className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(product._id)}
              className="mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
            >
              Delete product
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
