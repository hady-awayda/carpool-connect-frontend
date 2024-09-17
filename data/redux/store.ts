import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/slice";
import tokenReducer from "./tokenSlice/slice";
import addressReducer from "./addressListSlice/slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer,
    address: addressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
