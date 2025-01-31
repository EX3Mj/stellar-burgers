import { expect, test, describe } from '@jest/globals';
import { ingredientSlice, initialState } from './ingredientSlice';
import { getAllIngredients } from '../thunk/ingredientThunk';
import { TIngredient } from '@utils-types';

const mockedIngredients: TIngredient[] = [
  {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
    price: 1255,
    proteins: 80,
    type: 'bun',
    _id: '643d69a5c3f7b9001cfa093c'
  },
  {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    name: 'Биокотлета из марсианской Магнолии',
    price: 424,
    proteins: 420,
    type: 'main',
    _id: '643d69a5c3f7b9001cfa0941'
  }
];

describe('ingredients reducer', () => {
  test('[ingredientSlice] ingredients fulfilled', () => {
    const action = {
      type: getAllIngredients.fulfilled.type,
      payload: mockedIngredients
    };
    const state = ingredientSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      ingredients: mockedIngredients,
      ingredientsRequest: false
    });
  });

  test('[ingredientSlice] ingredients rejected - initialState not changing, isLoading - false', () => {
    const action = {
      type: getAllIngredients.rejected.type
    };
    const state = ingredientSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, ingredientsRequest: false });
  });

  test('[ingredientSlice] ingredients pending', () => {
    const action = {
      type: getAllIngredients.pending.type
    };
    const state = ingredientSlice.reducer(initialState, action);
    expect(state).toEqual({ ...initialState, ingredientsRequest: true });
  });
});
