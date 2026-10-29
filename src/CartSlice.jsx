import { createSlice } from '@reduxjs/toolkit';

// Cart item shape: { id, name, price, image, category, quantity }
const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Adds a plant to the cart (quantity 1). Ignored if it is already in the cart.
    addItem: (state, action) => {
      const { id, name, price, image, category } = action.payload;
      const existing = state.items.find((item) => item.id === id);
      if (!existing) {
        state.items.push({ id, name, price, image, category, quantity: 1 });
      }
    },

    // Removes a plant from the cart entirely (delete button).
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // "+" button: quantity goes up by one.
    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },

    // "-" button: quantity goes down by one; at quantity 1 the item is removed.
    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload);
      }
    },
  },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
