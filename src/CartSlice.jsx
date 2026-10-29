import { createSlice } from '@reduxjs/toolkit';

// Cart item shape: { name, cost, image, category, quantity }
// Plants are identified by their unique name.
const initialState = {
  items: [],
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Adds a plant to the cart (quantity 1). Ignored if it is already in the cart.
    addItem: (state, action) => {
      const { name, cost, image, category } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);
      if (!existingItem) {
        state.items.push({ name, cost, image, category, quantity: 1 });
      }
    },

    // Removes a plant from the cart entirely.
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },

    // Sets the quantity of a plant. payload: { name, quantity }
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);
      if (!itemToUpdate) return;
      if (quantity < 1) {
        state.items = state.items.filter((item) => item.name !== name);
      } else {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
