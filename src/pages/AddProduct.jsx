import React  from 'react';

export default function AddProduct() {

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-semibold mb-2">General</h2>
      <input className="w-full p-2 border rounded mb-2" type="text" name="name" placeholder="Product Name" />
      <input className="w-full p-2 border rounded mb-2" type="text" name="description" placeholder="Description" />
      <input className="w-full p-2 border rounded mb-2" type="number" name="price" placeholder="Price" />
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" > Add Product </button>
    </div>
  );
}
