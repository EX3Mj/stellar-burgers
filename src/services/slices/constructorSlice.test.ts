import { expect, test, describe } from '@jest/globals';
import {
  constructorSlice,
  initialState,
  addIngredient,
  removeIngredient,
  resetBurger,
  sortIngredient
} from './constructorSlice';
import { TIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';

jest.mock('@reduxjs/toolkit', () => ({
  ...jest.requireActual('@reduxjs/toolkit'),
  nanoid: jest.fn(() => 'mockID')
}));

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
  },
  {
    calories: 30,
    carbohydrates: 40,
    fat: 20,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    name: 'Соус Spicy-X',
    price: 90,
    proteins: 30,
    type: 'sauce',
    _id: '643d69a5c3f7b9001cfa0942'
  }
];

describe('constructor reducer', () => {
  test('[constructorSlice] add bun', () => {
    const state = constructorSlice.reducer(
      initialState,
      addIngredient(mockedIngredients[0])
    );
    expect(nanoid).toHaveBeenCalled();
    expect(state.constructorItems.bun).toEqual({
      ...mockedIngredients[0],
      id: 'mockID'
    });
  });

  test('[constructorSlice] add main ingredient', () => {
    const state = constructorSlice.reducer(
      initialState,
      addIngredient(mockedIngredients[1])
    );
    expect(nanoid).toHaveBeenCalled();
    expect(state.constructorItems.ingredients.length).toBe(1);
    expect(state.constructorItems.ingredients[0]).toEqual({
      ...mockedIngredients[1],
      id: 'mockID'
    });
  });

  test('[constructorSlice] remove ingredient', () => {
    const stateTestAddedMainIngredient = constructorSlice.reducer(
      initialState,
      addIngredient(mockedIngredients[2])
    );
    const stateTestRemovedMainIngredient = constructorSlice.reducer(
      stateTestAddedMainIngredient,
      removeIngredient({ ...mockedIngredients[2], id: 'mockID' })
    );
    expect(stateTestRemovedMainIngredient).toEqual(initialState);
  });

  test('[constructorSlice] move ingredient', () => {
    const stateTestWithIngredients = {
      ...initialState,
      constructorItems: {
        bun: null,
        ingredients: [
          { ...mockedIngredients[1], id: 'mockID-1' },
          { ...mockedIngredients[2], id: 'mockID-2' }
        ]
      }
    };
    const stateTestMovedMainIngredient = constructorSlice.reducer(
      stateTestWithIngredients,
      sortIngredient({
        ingredient: stateTestWithIngredients.constructorItems.ingredients[1],
        moveTo: 'up'
      })
    );
    expect(stateTestMovedMainIngredient.constructorItems.ingredients).toEqual([
      { ...mockedIngredients[2], id: 'mockID-2' },
      { ...mockedIngredients[1], id: 'mockID-1' }
    ]);
  });
});
