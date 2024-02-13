import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import apikeysReducer from "./apikey";

const store = configureStore({
  reducer: {
    user: userReducer,
    apikey: apikeysReducer
  },
});

export default store;