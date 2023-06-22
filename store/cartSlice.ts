import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface CartState {
  items: CartItem[];
  subtotal: number,
  discount: number,
  total: number
}

const initialState: CartState = {
  items: [],
  discount: 0,
  subtotal: 0,
  total: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state: CartState, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      // const existingItem = state.items.find(item => item.id === newItem.id);

      state.items.push(newItem);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;