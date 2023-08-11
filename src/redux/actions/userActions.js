import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const create_user = createAsyncThunk(
  'users/create',
  async (userData) => {
    try {
      const response = await axios.post('http://localhost:8082/api/user/createAdmin', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const read_users = createAsyncThunk(
  'users/read',
  async () => {
    try {
      let {data} = await axios.get('http://localhost:8082/api/user');
      return data.response
    } catch (error) {
      throw error;
    }
  }
);

const update_user = createAsyncThunk(
  'users/update',
  async ({ userId, updatedUser }) => {
    try {
      const response = await axios.put(`http://localhost:8082/api/user/updateAdmin/${userId}`, updatedUser);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const userActions = { create_user, read_users, update_user };

export default userActions;
