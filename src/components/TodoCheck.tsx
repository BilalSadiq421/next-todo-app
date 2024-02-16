import React from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Todo, addTodo, useTodos } from '@/redux/todoSlice';
import { RootState } from '@/store/store';
import { useAppDispatch } from '@/store/hooks';

const TodoCheck: React.FC = () => {
  const dispatch = useAppDispatch();
  const todos = useTodos()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      todoInput: { value: string };
    };
    const newTodo: Todo = {
      id: Date.now(),
      text: target.todoInput.value,
      completed: false,
    };
    dispatch(addTodo(newTodo));
    target.todoInput.value = '';
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Todo App
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Add Todo"
          variant="outlined"
          name="todoInput"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Add
        </Button>
      </form>
      <ul>
        {todos.map((todo:Todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoCheck;