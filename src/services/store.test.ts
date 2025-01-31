import { expect, describe } from '@jest/globals';
import store, { rootReducer } from './store';

describe('[rootReducer] проверка корневого редьюсера стора', () => {
  test('rootReduce возвращает корректное начальное состояние хранилища', () => {
    const initAction = { type: '@@INIT' };
    const initialState = rootReducer(undefined, initAction);
    expect(store.getState()).toEqual(initialState);
  });
});
