import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions.js';
import { api, apiUrl, endpoints } from '../utils/api'
import Swal from 'sweetalert2';

function CreateUser() {
  const dispatch = useDispatch();
  const { create_user } = userActions;

  const [userData, setUserData] = useState({ email: '', password: '', photo: '', location: '', role: 2 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(apiUrl + endpoints.admin, userData);

      Swal.fire({
        icon: "success",
        title: "New user created successfully!",
      });

      dispatch(create_user(response.data));

      setUserData({ email: '', password: '', photo: '', location: '', role: 2 });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='m-[10%] flex flex-col justify-center items-center'>
      <h2 className='font-semibold text-xl'>CREATE USER WITH ADMINISTRATOR PERMISSIONS</h2>
        <form onSubmit={handleSubmit} className='p-6 flex flex-col items-center w-[60%]'>
          <div className='flex justify-between items-center w-full p-2'>
          <label className='font-semibold'>EMAIL:</label>
          <input className='border-2 hover:border-sky-600 p-2' type="email" name="email" value={userData.email} onChange={handleChange} required />
          </div>
          <div className='flex justify-between items-center w-full p-2'>
          <label className='font-semibold'>PASSWORD:</label>
          <input className='border-2 hover:border-sky-600 p-2' type="password" name="password" value={userData.password} onChange={handleChange} required />
          </div>
          <div className='flex justify-between items-center w-full p-2'>
          <label className='font-semibold'>PHOTO URL:</label>
          <input className='border-2 hover:border-sky-600 p-2' type="text" name="photo" value={userData.photo} onChange={handleChange} required />
          </div>
          <div className='flex justify-between items-center w-full p-2'>
          <label className='font-semibold'>LOCATION:</label>
          <input className='border-2 hover:border-sky-600 p-2' type="text" name="location" value={userData.location} onChange={handleChange} />
          </div>
          <div className='p-2 bg-sky-600 rounded mt-5'>
          <button type="submit">Create User</button>
          </div>
        </form>
    </div>
  );
}

export default CreateUser;
