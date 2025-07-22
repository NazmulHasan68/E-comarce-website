// src/redux/RootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../redux/features/authSlice';
import cartReducer from '../redux/features/cartSlice';
import likeReducer from '../redux/features/LikeSlice';
import { authApi } from './ApiController/authApi';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

// Configs
const cartPersistConfig = {
  key: 'cart',
  storage,
};

const likePersistConfig = {
  key: 'like',
  storage,
};

// Combine all reducers
const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer, // RTK Query reducer
  auth: authReducer,                      // Not persisted
  cart: persistReducer(cartPersistConfig, cartReducer), // Persisted
  like: persistReducer(likePersistConfig, likeReducer), // Persisted
});

export default rootReducer;
