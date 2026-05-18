import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import orderReducer from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    order: orderReducer,
  },
});

 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;