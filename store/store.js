import { configureStore } from "@reduxjs/toolkit";
import ToastReducer from "./slices/ToastSlice";
import DrawerReducer from "./slices/DrawerSlice";
import UserReducer from "./slices/UserSlice";
import UsersReducer from "./slices/UsersSlice";

export const store = configureStore({
  reducer: {
    toast: ToastReducer,
    drawer: DrawerReducer,
    user: UserReducer,
    users: UsersReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});
