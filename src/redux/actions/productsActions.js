import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
const read_products = createAsyncThunk(
    'read_products',async () => {
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
const read_pag_appliances=createAsyncThunk(
    'read_pag_appliances',async (page) => {
        
        try {
            let {data} = await axios.get(`http://localhost:8082/api/products/appliances?page=${page}`)
            console.log(data)
            return {
                products: data.response, // Datos de productos y electrodomésticos
                prevPage: data.prev,      // Valor prev
                nextPage: data.next,      // Valor next
                totalPages: data.totalDocuments,
                currentPage:data.currentPage // Total de páginas
              };
            
        } catch (error) {
            console.log(error)
            return null;
        }
    }
    
)
const read_pag_techs=createAsyncThunk(
    'read_pag_techs',async (page) => {
        
        try {
            let {data} = await axios.get(`http://localhost:8082/api/products/techs?page=${page}`)
            console.log(data)
            return {
                products: data.response, // Datos de productos y electrodomésticos
                prevPage: data.prev,      // Valor prev
                nextPage: data.next,      // Valor next
                totalPages: data.totalDocuments,
                currentPage:data.currentPage // Total de páginas
              };
            
        } catch (error) {
            console.log(error)
            return null;
        }
    }
    
)
const read_pag_gamers=createAsyncThunk(
    'read_pag_gamers',async (page) => {
        
        try {
            let {data} = await axios.get(`http://localhost:8082/api/products/gamers?page=${page}`)
            console.log(data)
            return {
                products: data.response, // Datos de productos y electrodomésticos
                prevPage: data.prev,      // Valor prev
                nextPage: data.next,      // Valor next
                totalPages: data.totalDocuments,
                currentPage:data.currentPage // Total de páginas
              };
            
        } catch (error) {
            console.log(error)
            return null;
        }
    }
    
)

const productsActions = { read_products,read_pag_appliances,read_pag_techs, read_pag_gamers }
export default productsActions