import { expect, test, describe } from '@jest/globals';
import { userSlice, initialState } from './userSlice';
import { TUser, TOrder } from '@utils-types';
import { TLoginData, TAuthResponse } from '@api';
import {
  getUser,
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
  getUserOrders
} from '../thunk/userThunk';

const mockedUser: TUser = {
  email: 'test@test.ru',
  name: 'Ivan'
};

const mockedResponseUserData: TAuthResponse = {
  user: {
    email: 'test@test.ru',
    name: 'Ivan'
  },
  success: true,
  refreshToken: 'testrefreshtoken',
  accessToken: 'testaccesstoken'
};

const mockedUserOrders: TOrder[] = [
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

describe('userSlice reducer', () => {
  test('[getUser] user data fulfilled', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: mockedUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: mockedUser,
      isAuthChecked: true,
      authRequest: false
    });
  });

  test('[getUser] user data pending', () => {
    const action = {
      type: getUser.pending.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      authRequest: true,
      isAuthChecked: false
    });
  });

  test('[getUser] user data rejected', () => {
    const action = {
      type: getUser.rejected.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      authRequest: false,
      isAuthChecked: true
    });
  });

  test('[registerUser] user registred fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockedResponseUserData
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: mockedResponseUserData.user,
      authRequest: false
    });
  });

  test('[registerUser] user registred pending', () => {
    const action = {
      type: registerUser.pending.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      authRequest: true
    });
  });

  test('[registerUser] user registred rejected', () => {
    const action = {
      type: registerUser.rejected.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      authRequest: false
    });
  });

  test('[loginUser] user login fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockedUser
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: mockedUser,
      isAuthChecked: true,
      authRequest: false
    });
  });

  test('[loginUser] user login pending', () => {
    const action = {
      type: loginUser.pending.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: false,
      authRequest: true
    });
  });

  test('[loginUser] user login rejected', () => {
    const action = {
      type: loginUser.rejected.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuthChecked: true,
      authRequest: false
    });
  });

  test('[updateUser] user data update fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: mockedResponseUserData
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: mockedResponseUserData.user,
      authRequest: false
    });
  });

  test('[updateUser] user data update pending', () => {
    const action = {
      type: updateUser.pending.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      authRequest: true
    });
  });

  test('[updateUser] user data update rejected', () => {
    const action = {
      type: updateUser.rejected.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      authRequest: false
    });
  });

  test('[logoutUser] user log out fulfilled', () => {
    const action = {
      type: logoutUser.fulfilled.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: null,
      authRequest: false
    });
  });

  test('[logoutUser] user log out pending', () => {
    const action = {
      type: logoutUser.pending.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      authRequest: true
    });
  });

  test('[logoutUser] user log out rejected', () => {
    const action = {
      type: logoutUser.rejected.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      authRequest: false
    });
  });

  test('[getUserOrders] user orders fulfilled', () => {
    const action = {
      type: getUserOrders.fulfilled.type,
      payload: mockedUserOrders
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userOrders: mockedUserOrders,
      userOrderRequest: false
    });
  });

  test('[getUserOrders] user orders pending', () => {
    const action = {
      type: getUserOrders.pending.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userOrderRequest: true
    });
  });

  test('[getUserOrders] user orders rejected', () => {
    const action = {
      type: getUserOrders.rejected.type
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      userOrderRequest: false
    });
  });
});
