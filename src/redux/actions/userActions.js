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

const userActions = { create_user };

export default userActions;
