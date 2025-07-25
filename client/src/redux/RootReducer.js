// src/redux/RootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../redux/features/authSlice';
import cartReducer from '../redux/features/cartSlice';
import likeReducer from '../redux/features/LikeSlice';
import { authApi } from './ApiController/authApi';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { categoryApi } from './ApiController/categoryApi';
import { bandApi } from './ApiController/bandApi';
import { productApi } from './ApiController/productApi';
import { heroApi } from './ApiController/heroApi';
import { orderApi } from './ApiController/orderApi';

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
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer ,// RTK Query reducer
  [bandApi.reducerPath] : bandApi.reducer,
  [productApi.reducerPath] : productApi.reducer,
  [heroApi.reducerPath] : heroApi.reducer,
  [orderApi.reducerPath] : orderApi.reducer,
  
  auth: authReducer,                      // Not persisted
  cart: persistReducer(cartPersistConfig, cartReducer), // Persisted
  like: persistReducer(likePersistConfig, likeReducer), // Persisted
});

export default rootReducer;
