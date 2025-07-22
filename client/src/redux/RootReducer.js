// src/redux/RootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../redux/features/authSlice';
import cartReducer from '../redux/features/cartSlice';
import { authApi } from './ApiController/authApi';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

// Only persist cart slice
const cartPersistConfig = {
  key: 'cart',
  storage,
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  cart: persistReducer(cartPersistConfig, cartReducer), // Persist cart slice only
});

export default rootReducer;
