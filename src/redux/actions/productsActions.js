import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const read_products = createAsyncThunk(
    'read',async () => {
        console.log()
        try {
            let {data} = await axios.get("http://localhost:8082/api/products")
            return data.response
        } catch (error) {
            console.log(error)
            return null;
        }
    }
)

const update_product = createAsyncThunk(
    'update',
    async (product) => {
      try {
        const response = await axios.put( `http://localhost:8082/api/products/${product._id}`, product );
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );

  const delete_product = createAsyncThunk(
    'delete',
    async (productId) => {
      try {
        const response = await axios.delete(`http://localhost:8082/api/products/${productId}`);
        return response.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
);


const productsActions = { read_products, update_product, delete_product }
export default productsActions