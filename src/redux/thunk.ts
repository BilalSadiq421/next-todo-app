import { AppThunk } from "@/store/store";
import { Todo } from "./todoSlice";
import { PayloadAction } from "@reduxjs/toolkit";

export const fetchTodos = (): AppThunk => async (dispatch) => {
    try {
      // Simulate fetching todos from an API
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const todos: Todo[] = await response.json();
      dispatch(addTodos(todos));
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  
  export const addTodos = (todos: Todo[]): PayloadAction<Todo[]> => ({
    type: 'todos/addTodos',
    payload: todos,
  });