import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient, TOrder } from '../../utils/types';
import { orderBurger } from '../thunk/constructorThunk';

export type TConstuctorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

export const initialState: TConstuctorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    },
    resetBurger: (state) => {
      state.orderModalData = null;
    },
    sortIngredient: (
      state,
      action: PayloadAction<{
        ingredient: TConstructorIngredient;
        moveTo: 'up' | 'down';
      }>
    ) => {
      const { ingredients } = state.constructorItems;
      const index = ingredients.findIndex(
        (item) => item.id === action.payload.ingredient.id
      );
      const targetIndex =
        action.payload.moveTo === 'up' ? index - 1 : index + 1;

      if (targetIndex >= 0 && targetIndex < ingredients.length) {
        const newIngredients = [...ingredients];
        [newIngredients[index], newIngredients[targetIndex]] = [
          newIngredients[targetIndex],
          newIngredients[index]
        ];

        state.constructorItems.ingredients = newIngredients;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
      });
  }
});

export const { addIngredient, removeIngredient, resetBurger, sortIngredient } =
  constructorSlice.actions;
