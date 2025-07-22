// src/redux/features/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, size, color } = action.payload;
      const existing = state.cartItems.find(
        item =>
          item.id === id &&
          (item.size === size || (!item.size && !size)) &&
          (item.color === color || (!item.color && !color))
      );
      if (!existing) {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart(state, action) {
      const { id, size, color } = action.payload;
      state.cartItems = state.cartItems.filter((item) => {
        const matchId = item.id === id;
        const matchSize = size ? item.size === size : true;
        const matchColor = color ? item.color === color : true;

        return !(matchId && matchSize && matchColor);
      });
    },

    updateQuantity(state, action) {
      const { id, quantity, size, color } = action.payload;
      const item = state.cartItems.find(
        i =>
          i.id === id &&
          (size ? i.size === size : true) &&
          (color ? i.color === color : true)
      );

      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
        } else {
          state.cartItems = state.cartItems.filter(i =>
            !(i.id === id &&
              (size ? i.size === size : true) &&
              (color ? i.color === color : true))
          );
        }
      }
    },

    incrementQuantity(state, action) {
      const { id, size, color } = action.payload;
      const item = state.cartItems.find(
        i =>
          i.id === id &&
          (size ? i.size === size : true) &&
          (color ? i.color === color : true)
      );
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity(state, action) {
      const { id, size, color } = action.payload;
      const item = state.cartItems.find(
        i =>
          i.id === id &&
          (size ? i.size === size : true) &&
          (color ? i.color === color : true)
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        state.cartItems = state.cartItems.filter(i =>
          !(i.id === id &&
            (size ? i.size === size : true) &&
            (color ? i.color === color : true))
        );
      }
    },

    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
