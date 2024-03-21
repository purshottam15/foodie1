import { createSlice } from "@reduxjs/toolkit";
import { createUser } from "./authApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkUser } from "./authApi";
import { getUser } from "./authApi";
const initialState = {
  value: 10,
  userCreatedSuccess: false,
  error: null,
  user:null,
  loginError:null,
  userInfo:null,
};

export const CreateUserAsync = createAsyncThunk(
  'auth/createUser',
  async (data) => {
    try {
      const response = await createUser(data);
      return response.data;
    } catch (error) {
      // If createUser function throws an error, it will be caught here
      throw error;
    }
  }
);
export const userloginAsync = createAsyncThunk(
  'auth/loginuser',
  async (data) => {
    try {
      const response = await checkUser(data);
      return response
    } catch (error) {
      // If createUser function throws an error, it will be caught here
      throw error;
    }
  }
);
export const getUserAsync = createAsyncThunk(
  'auth/getuser',
  async () => {
    try {
      const response = await getUser();
      return response;
    } catch (error) {
      // If createUser function throws an error, it will be caught here
      throw error;
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CreateUserAsync.fulfilled, (state, action) => {
      state.userCreatedSuccess = true;
    });
    builder.addCase(CreateUserAsync.rejected, (state, action) => {
      state.userCreatedSuccess = false;
      state.error = action.error.message; 
    });
    builder.addCase(userloginAsync.fulfilled, (state, action) => {
     
      state.user=action.payload.token;
      
    });
    builder.addCase(userloginAsync.rejected, (state, action) => {
      state.loginError = action.error.message; 
    });
    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      console.log("token",action.payload)
      state.userInfo=action.payload.user;
    });
  }
});

export const usercreated = (state) => state.auth.userCreatedSuccess;
export const errorMessage = (state) => state.auth.error;
export const loginError = (state) => state.auth.loginError;
export const userLog = (state) => state.auth.user;
export const userInfo = (state) => state.auth.userInfo;

export const { increment, clearError } = authSlice.actions;
export default authSlice.reducer;
