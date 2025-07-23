// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './RootReducer';
import { authApi } from './ApiController/authApi';
import persistStore from 'redux-persist/es/persistStore';
import { categoryApi } from './ApiController/categoryApi';

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check due to redux-persist
    }).concat(authApi.middleware, categoryApi.middleware),
});

export const persistor = persistStore(appStore);

// Optionally preload data on app start
const initializeApp = async () => {
  try {
    await appStore.dispatch(
      authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
    );
  } catch (error) {
    console.error("Error loading user:", error);
  }
};
initializeApp();
