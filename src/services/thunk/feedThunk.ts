import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedApi, getOrderByNumberApi } from '@api';

export const getOrderByNumber = createAsyncThunk(
  'order/id',
  async (id: number) => await getOrderByNumberApi(id)
);

export const getFeed = createAsyncThunk(
  'feeds/all',
  async () => await getFeedApi()
);
