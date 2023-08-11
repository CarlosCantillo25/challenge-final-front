import { createReducer } from "@reduxjs/toolkit";
import productsActions from "../actions/productsActions";

let { read_products, read_pag_appliances, read_pag_techs, read_pag_gamers } = productsActions;

let initialState = {
  products: [],
  appliances: [],
  techs: [],
  gamers: [],
  prevPage: null,
  nextPage: null,
  totalPages: null,
  curentPage: 1
};

const productsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(read_products.fulfilled, (state, action) => {
      return {
        ...state,
        products: action.payload
      };
    })
    .addCase(read_pag_appliances.fulfilled, (state, action) => {
      // Manejar el estado para la otra acción aquí
      return {
        ...state,
        appliances: action.payload,
        prevPage: action.payload.prevPage,
        nextPage: action.payload.nextPage,
        totalPages: action.payload.totalPages
      };
    })
    .addCase(read_pag_techs.fulfilled, (state, action) => {
      // Manejar el estado para la otra acción aquí
      return {
        ...state,
        techs: action.payload,
        prevPage: action.payload.prevPage,
        nextPage: action.payload.nextPage,
        totalPages: action.payload.totalPages
      };
    })
    .addCase(read_pag_gamers.fulfilled, (state, action) => {
      // Manejar el estado para la otra acción aquí
      return {
        ...state,
        gamers: action.payload,
        prevPage: action.payload.prevPage,
        nextPage: action.payload.nextPage,
        totalPages: action.payload.totalPages
      };
    });
})

export default productsReducer;
