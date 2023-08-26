import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import productsActions from '../redux/actions/productsActions.js';
import ReactDOM from 'react-dom';
const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

export default function CarritoPage() {
  const dispatch = useDispatch();
  const [cartProductIds, setCartProductIds] = useState([]);
  const [productCount, setProductCount] = useState({});
  const read_products = useSelector(store => store.products.products);

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

  const cartProducts = read_products.filter(product => cartProductIds.includes(product._id));

  const calculateTotalAmount = () => {
    let total = 0;
    cartProducts.forEach(product => {
      if (productCount[product._id]) {
        total += product.price * productCount[product._id];
      }
    });
    return total;
  };

  const updateProductCount = (productId, newCount) => {
    if (newCount <= 0) {
      removeFromCart(productId);
    } else {
      const updatedCountObj = { ...productCount, [productId]: newCount };
      setProductCount(updatedCountObj);
      localStorage.setItem('product cart', JSON.stringify(Object.keys(updatedCountObj)));
    }
  };

  const removeFromCart = (productId) => {
    const updatedCountObj = { ...productCount };
    delete updatedCountObj[productId];
    setProductCount(updatedCountObj);
    setCartProductIds(cartProductIds.filter(id => id !== productId)); // Remove from cartProducts
    localStorage.setItem('product cart', JSON.stringify(Object.keys(updatedCountObj)));
  };

  const createOrder = (data, actions) => {
    const cartItems = cartProducts.map(product => ({
      sku: product.sku,
      quantity: productCount[product._id],
    }));

    return fetch("http://localhost:8082/api/paypal/create-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: cartItems,
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };

  const onApprove = (data, actions) => {
    return fetch("http://localhost:8082/api/paypal/capture-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    })
      .then((response) => response.json());
  };

  return (
    <div className='bg-[#f0eeee] py-[3rem] min-h-[45vh]'>
      <h2 className='ml-[2rem] text-[#5a5858] text-[1.3rem]'>Products in the cart:</h2>
      {cartProducts.length === 0 ? (
      <div className='flex justify-center items-center h-[52vh] flex-col gap-8'>
        <p className='text-xl font-semibold text-[3rem]'>Your cart is empty 😔</p>
        <p>If you want to add products to your cart, return to the main page or browse the categories to choose the product that you like</p>
      <img className='w-[5rem]' src="/cartEmpty.png" alt="" />
      </div>
    ) : (
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
      )}
      <div className="flex justify-center mt-4">
        <p className="text-xl font-semibold">Total Amount: UDS${calculateTotalAmount()}</p>
      </div>
      <div className="mt-2 flex justify-center">
        {cartProducts.length > 0 && (
          <PayPalButton
            createOrder={(data, actions) => createOrder(data, actions)}
            onApprove={(data, actions) => onApprove(data, actions)}
          />
        )}
      </div>
    </div>
  );
}