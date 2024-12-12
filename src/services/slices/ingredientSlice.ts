import { TIngredient } from '../../utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { getAllIngredients } from '../thunk/ingredientThunk';

interface TIngredientsState {
  ingredients: TIngredient[];
  ingredientsRequest: boolean;
}

export const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsRequest: false
};

export const ingredientSlice = createSlice({
  name: 'ingredientData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllIngredients.pending, (state) => {
        state.ingredientsRequest = true;
      })
      .addCase(getAllIngredients.fulfilled, (state, action) => {
        state.ingredients = [...action.payload];
        state.ingredientsRequest = false;
      })
      .addCase(getAllIngredients.rejected, (state, action) => {
        state.ingredientsRequest = false;
      });
  }
});
