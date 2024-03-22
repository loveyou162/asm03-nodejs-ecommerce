import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
import counterReducer from "./counter-slice";
import authReducer from "./auth-slice";
import cartReducer from "./cartSlice";
const store = configureStore({
  reducer: {
    ui: uiReducer,
    counter: counterReducer,
    auth: authReducer,
    cart: cartReducer,
  },
});

export default store;
