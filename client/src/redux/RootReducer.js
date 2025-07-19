import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../redux/features/authSlice"; 
import { authApi } from "./ApiController/authApi";


const rootRedcuer = combineReducers({
    [authApi.reducerPath]:authApi.reducer,
    auth:authReducer, 
});
export default rootRedcuer;