import { RootState } from '@/store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    // Add more reducers for updating and deleting todos if needed
  },
});

export const useTodos =  () => useSelector((state: RootState) => state.todos.todos );

export const { addTodo } = todoSlice.actions;

export default todoSlice.reducer;