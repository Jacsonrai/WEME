import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../reducer/authReducer";

const store = configureStore({
  reducer: combineReducers({
    authReducer,
  }),
});
export default store;
