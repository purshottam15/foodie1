import { createSlice } from "@reduxjs/toolkit";
import { deletefood, updatecart } from "./cartApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchcart } from "./cartApi";
import { clearcart } from "./cartApi";
import { placeOrder } from "./cartApi";

const initialState = {
  cart: [],
  currOrder:false
};

export const deletefoodAsync = createAsyncThunk(
  'cart/deletefood',
  async (id) => {
    try {
      const response = await deletefood(id);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const updatecartAsync = createAsyncThunk(
  'cart/updatecart',
  async ( {id, newQuantity} ) => {
    try {
     
      const response = await updatecart(id, newQuantity);
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchCartAsync = createAsyncThunk(
  'cart/fetchcart',
  async () => {
    try {
      
      const response = await fetchcart();
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const clearCartAsync = createAsyncThunk(
  'cart/clearcart',
  async () => {
    try {
      
      const response = await clearcart();
      return response;
    } catch (error) {
      throw error;
    }
  }
);
export const placeOrderAsync = createAsyncThunk(
  'cart/orderPlaced',
  async (data) => {
    try {
      
      const response = await placeOrder(data);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearOrder: (state) => {
      state.currOrder = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deletefoodAsync.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item._id !== action.payload._id);
      })
      .addCase(updatecartAsync.fulfilled, (state, action) => {
        const index = state.cart.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.cart[index] = action.payload.updatedItem;
        }
      }) .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload.item;
      })
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        state.cart = [];
      })
      .addCase(clearCartAsync.rejected, (state, action) => {
        state.cart = [];
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.currOrder = true;
      })
      .addCase(placeOrderAsync.rejected, (state, action) => {
        state.currOrder = false
      })
  }
});

export const cartItem = (state) => state.cart.cart;
export const orderFood = (state) => state.cart.currOrder;

export const { increment, clearError ,clearOrder} = cartSlice.actions;
export default cartSlice.reducer;
