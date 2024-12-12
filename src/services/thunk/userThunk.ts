import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  registerUserApi,
  TRegisterData,
  loginUserApi,
  TLoginData,
  logoutApi,
  updateUserApi,
  getOrdersApi
} from '@api';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';

export const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    if (getCookie('accessToken')) {
      const res = await getUserApi();
      return res.user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
});

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    try {
      const res = await loginUserApi(data);
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      return res.user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  logoutApi()
    .then(() => {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    })
    .catch((err) => {
      console.log(err);
    });
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: TRegisterData) => await updateUserApi(data)
);

export const getUserOrders = createAsyncThunk(
  'user/userOrders',
  async () => await getOrdersApi()
);
