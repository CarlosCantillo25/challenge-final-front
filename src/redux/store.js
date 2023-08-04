import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/product.js"


export const store = configureStore({
    reducer: {
        product: productReducer
      },
})