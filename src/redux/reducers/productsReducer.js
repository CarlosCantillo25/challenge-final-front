import { createReducer } from "@reduxjs/toolkit"
import productsActions from "../actions/productsActions"

let { read_products, update_product} =productsActions

let initialState = {
    products: []
}
const productsReducer = createReducer(initialState, (builder) => builder
    .addCase(read_products.fulfilled, (state, action)=>{
        let newState = {
            ...state,
            products: action.payload
        }
        return newState
    })
    .addCase(update_product.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        )
      })
  )
export default productsReducer