import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import todoReducer from '../redux/todoSlice'

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    // Add more reducers if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;