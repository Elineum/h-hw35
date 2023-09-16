import React from "react";
import { Provider } from "react-redux";
import { configureStore, createReducer } from "@reduxjs/toolkit";
import createAddGoodsAction from "./actions/createAddGoodsAction.js";
import createRemoveGoodsAction from "./actions/createRemoveGoodsAction.js";
import createUpdateItemAction from "./actions/createUpdateItemAction.js";

const reducer = createReducer([], {
  [createAddGoodsAction.type]: (state, action) => [...state, action.payload],
  [createRemoveGoodsAction.type]: (state, action) =>
    state.filter((goods) => goods.id !== action.payload.id),
  [createUpdateItemAction.type]: (state, action) =>
    state.map((good) =>
      good.id === action.payload.id ? action.payload : good
    ),
});

const localStorage = window.localStorage;
const localData = JSON.parse(localStorage.getItem("shopState"));
const store = configureStore({ reducer, preloadedState: localData || [] });

store.subscribe(() => {
  const stringifyedState = JSON.stringify(store.getState());
  localStorage.setItem("shopState", stringifyedState);
});

export const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
