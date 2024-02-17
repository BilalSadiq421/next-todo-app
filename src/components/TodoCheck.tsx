import React from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { Todo, addTodo, useTodos } from "@/redux/todoSlice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";

const TodoCheck: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const todos: Todo[] = useTodos();

  const setUserLogOut = () => {
    localStorage.removeItem("userAuthData");
    router.push("/login");
  };

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
    target.todoInput.value = "";
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
      <Button variant="contained" color="primary" onClick={setUserLogOut}>
        Sign out
      </Button>
      <ul>
        {todos.map((todo: Todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoCheck;
