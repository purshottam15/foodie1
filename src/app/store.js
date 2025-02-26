import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../auth/authSlice'
import cartSlice from '../cart/cartSlice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    cart:cartSlice,
  },
})