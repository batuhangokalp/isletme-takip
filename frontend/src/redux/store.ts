import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import customersReducer from "./customerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    customers: customersReducer,
  },
});

// Tipler
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
