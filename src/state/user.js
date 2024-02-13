import { createAction, createReducer } from "@reduxjs/toolkit";

export const setUser = createAction("SET_USER");
export const setFavorites = createAction("SET_USER_FAVS"); //es otro pedido axios
//export const addToFavs = createAction("ADD_TO_FAVORITES");
//export const removeFromFavs = createAction("REMOVE_FROM_FAVORITES");
export const clearUser = createAction("CLEAR_USER")
export const setOnlyMail = createAction("SET_ONLY_MAIL")

const initialState = {
  id: null,
  name: null,
  lastname: null,
  email: null,
  favorites: []
}

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => action.payload)
    .addCase(setFavorites, (state, action) => {
      return {
        ...state,
        favorites: action.payload
      };
    })
    .addCase(clearUser, (state, action) => {
      return {
        id: null,
        name: null,
        lastname: null,
        email: null,
        favorites: []
      };
    })
    .addCase(setOnlyMail, (state, action) => {
      return {
        ...state,
        email: action.payload
      };
    });
});
export default userReducer;