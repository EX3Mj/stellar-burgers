import { expect, test, describe } from '@jest/globals';
import { feedSlice, TFeedState, initialState } from './feedSlice';
import { TOrder } from '@utils-types';
import { getOrderByNumber, getFeed } from '../thunk/feedThunk';

const mockedOrders: TOrder[] = [
  {
    createdAt: '2025-01-24T12:14:06.827Z',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa093d'
    ],
    name: 'Флюоресцентный spicy люминесцентный метеоритный бургер',
    number: 66692,
    status: 'done',
    updatedAt: '2025-01-24T12:14:07.584Z',
    _id: '6793840e133acd001be4c6bf'
  },
  {
    createdAt: '2024-10-15T19:06:04.609Z',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa094a',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa093d'
    ],
    name: 'Астероидный флюоресцентный spicy бессмертный бургер',
    number: 66691,
    status: 'done',
    updatedAt: '2025-01-24T12:10:41.149Z',
    _id: '67938340133acd001be4c6bd'
  }
];

const mockedFeed: TFeedState = {
  orders: mockedOrders,
  total: 66320,
  totalToday: 125,
  isLoading: false,
  orderByNumber: null
};

describe('feed reducer', () => {
  test('[feedSlice] feeds fulfilled', () => {
    const action = {
      type: getFeed.fulfilled.type,
      payload: mockedFeed
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orders: mockedFeed.orders,
      total: mockedFeed.total,
      totalToday: mockedFeed.totalToday,
      isLoading: false
    });
  });

  test('[feedSlice] feeds rejected - initialState not changing, isLoading - false', () => {
    const action = {
      type: getFeed.rejected.type
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: false });
  });

  test('[feedSlice] feeds pending', () => {
    const action = {
      type: getFeed.pending.type
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: true });
  });

  test('[feedSlice] getOrderByNumber should set order by ID', () => {
    const action = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: mockedOrders, success: true }
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      orderByNumber: mockedOrders[0]
    });
  });

  test('[feedSlice] getOrderByNumber rejected - initialState not changing, isLoading - false', () => {
    const action = {
      type: getOrderByNumber.rejected.type
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: false });
  });

  test('[feedSlice] getOrderByNumber pending', () => {
    const action = {
      type: getOrderByNumber.pending.type
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, isLoading: true });
  });
});
