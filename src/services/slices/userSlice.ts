import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TUser, TOrder } from '../../utils/types';
import {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  getUserOrders
} from '../thunk/userThunk';

type TUserState = {
  user: TUser | null;
  userOrders: TOrder[];
  isAuthChecked: boolean;
  userOrderRequest: boolean;
  authRequest: boolean;
};

export const initialState: TUserState = {
  user: null,
  userOrders: [],
  isAuthChecked: false,
  userOrderRequest: false,
  authRequest: false
};

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.authRequest = true;
        state.isAuthChecked = false;
      })
      .addCase(getUser.rejected, (state) => {
        state.authRequest = false;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.authRequest = false;
      })
      .addCase(registerUser.pending, (state) => {
        state.authRequest = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.authRequest = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.authRequest = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = false;
        state.authRequest = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.authRequest = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isAuthChecked = true;
        state.authRequest = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.authRequest = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.authRequest = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.authRequest = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.authRequest = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.authRequest = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.authRequest = false;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.userOrderRequest = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.userOrderRequest = false;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.userOrderRequest = false;
      });
  }
});
