import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAllIngredients = createAsyncThunk(
  'ingredientData/getAllIngredients',
  async () => await getIngredientsApi()
);
