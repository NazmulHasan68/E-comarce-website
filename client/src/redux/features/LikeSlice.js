// src/redux/features/likeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  likedItems: [],
};

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
    addToLike(state, action) {
      const item = action.payload;
      const exists = state.likedItems.find(l => l.id === item.id);
      if (!exists) {
        state.likedItems.push(item);
      }
    },

    removeLike(state, action) {
      const id = action.payload;
      state.likedItems = state.likedItems.filter(item => item.id !== id);
    },

    clearLikes(state) {
      state.likedItems = [];
    },
  },
});

export const { addToLike, removeLike, clearLikes } = likeSlice.actions;
export default likeSlice.reducer;
