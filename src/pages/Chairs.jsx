import React from 'react';
import Product from '../components/product.jsx';

export default function Chairs() {
  const prop = "Chair";

  return (
    <Product property={prop} />
  );
}