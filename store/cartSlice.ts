import { Products } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartState {
  items: ({
    qty: number,
    discount: number
    sub_total: number
  } & Products)[];
  sub_total: number,
  discount: number,
  total_qty: number
  total: number
}

const initialState: CartState = {
  items: [],
  discount: 0,
  sub_total: 0,
  total: 0,
  total_qty: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<Products>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.qty += 1
        existingItem.sub_total = +existingItem.regularPrice * +existingItem.qty
        existingItem.discount = (+existingItem.regularPrice - +existingItem.salePrice) * +existingItem.qty
        state.total_qty = state.items.reduce((pre: any, nxt: any) => pre + nxt.qty, 0)
        state.discount = state.items.reduce((pre: any, nxt: any) => pre + nxt.discount, 0)
        state.sub_total = state.items.reduce((pre: any, nxt: any) => pre + nxt.sub_total, 0)
        state.total = state.items.reduce((pre: any, nxt: any) => pre + nxt.regularPrice * nxt.qty, 0)
      } else {
        state.items.push({
          ...newItem,
          discount: (newItem.regularPrice - newItem.salePrice) * 1,
          qty: 1,
          sub_total: newItem.regularPrice * 1
        });
        state.total_qty = state.items.reduce((pre: any, nxt: any) => pre + nxt.qty, 0)
        state.discount = state.items.reduce((pre: any, nxt: any) => pre + nxt.discount, 0)
        state.sub_total = state.items.reduce((pre: any, nxt: any) => pre + nxt.sub_total, 0)
        state.total = state.items.reduce((pre: any, nxt: any) => pre + nxt.regularPrice * nxt.qty, 0)
      }
    },
    removeToCart: (state: CartState, action: PayloadAction<{ id: string }>) => {
      const id = action.payload.id;
      const existingItemIndex = state.items.findIndex(item => item.id === id);

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];

        if (existingItem.qty > 1) {
          existingItem.qty -= 1;
          existingItem.sub_total = +existingItem.regularPrice * +existingItem.qty;
          existingItem.discount = (+existingItem.regularPrice - +existingItem.salePrice) * +existingItem.qty;

          state.total_qty = state.items.reduce((pre: any, nxt: any) => pre + nxt.qty, 0);
          state.discount = state.items.reduce((pre: any, nxt: any) => pre + nxt.discount, 0);
          state.sub_total = state.items.reduce((pre: any, nxt: any) => pre + nxt.sub_total, 0);
          state.total = state.items.reduce((pre: any, nxt: any) => pre + nxt.regularPrice * nxt.qty, 0);
        } else {
          state.items.splice(existingItemIndex, 1);
          state.total_qty = state.items.reduce((pre: any, nxt: any) => pre + nxt.qty, 0);
          state.discount = state.items.reduce((pre: any, nxt: any) => pre + nxt.discount, 0);
          state.sub_total = state.items.reduce((pre: any, nxt: any) => pre + nxt.sub_total, 0);
          state.total = state.items.reduce((pre: any, nxt: any) => pre + nxt.regularPrice * nxt.qty, 0);
        }
      }
    }
  },
});

export const { addToCart, removeToCart } = cartSlice.actions;

export default cartSlice.reducer;