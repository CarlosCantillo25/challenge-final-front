import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/product";
import productsReducer from "./reducers/productsReducer";



export const store = configureStore({
    reducer: {
    products:productsReducer,
      product:productReducer
      },
})