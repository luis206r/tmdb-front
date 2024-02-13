import { createAction, createReducer } from "@reduxjs/toolkit";

export const setKeys = createAction("SET_KEYS");

const initialState = {
  api_key: null,
  api_token: null
}

const apikeysReducer = createReducer(initialState, (builder) => {
  builder.addCase(setKeys, (state, action) => {
    return action.payload;
  });
});

export default apikeysReducer;