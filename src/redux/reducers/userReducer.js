import { createReducer } from "@reduxjs/toolkit";
import userActions from "../actions/userActions";

let { create_user } = userActions;

let initialState = {
  users: []
};

const userReducer = createReducer(initialState, (builder) => builder
  .addCase(create_user.fulfilled, (state, action) => {
    state.users.push(action.payload);
  })
);

export default userReducer;
