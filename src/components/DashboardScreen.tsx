// import React from "react";
// import { Button, CssBaseline, TextField, Typography } from "@material-ui/core";
// import { Todo, addTodo, useTodos } from "@/redux/todoSlice";
// import { useAppDispatch } from "@/store/hooks";
// import { useRouter } from "next/router";
// import { Box, Container, Grid, styled } from "@mui/material";

// const Item: React.FC = () => (<div style={{height: '150px', width:'100%', border: '1px solid black', marginBottom: '50px', borderRadius: '30px', padding: '20px', textAlign: 'center', alignItems:'center', justifyContent: 'center', fontSize: '24px'}}>
//  <h2>Title</h2>
// </div>);

// const DashboardScreen: React.FC = () => {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const todos: Todo[] = useTodos();

//   const setUserLogOut = () => {
//     localStorage.removeItem("userAuthData");
//     router.push("/login");
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const target = e.target as typeof e.target & {
//       todoInput: { value: string };
//     };
//     const newTodo: Todo = {
//       id: Date.now(),
//       text: target.todoInput.value,
//       completed: false,
//     };
//     dispatch(addTodo(newTodo));
//     target.todoInput.value = "";
//   };

//   return (
//     <>
//       <CssBaseline />
//       <Box
//         sx={{ bgcolor: "white", borderRadius: "20px", p: 5, marginBottom: '50px', overflow: 'hidden' }}
//       >
//         {/* <Typography variant="h1" gutterBottom>
//         Todo App
//       </Typography> */}
//         <Grid
//           container
//           spacing={{ xs: 4, md: 8 }}
//           columns={{ xs: 4, sm: 8, md: 12 }}
//           sx={{ borderBottom: "5px solid black" }}
//         >
//           {Array.from(Array(3)).map((_, index) => (
//             <Grid item xs={2} sm={4} md={4} key={index}>
//               <Item />
//             </Grid>
//           ))}
//         </Grid>
//         {/* <form onSubmit={handleSubmit}>
//         <TextField
//           label="Add Todo"
//           variant="outlined"
//           name="todoInput"
//           fullWidth
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Add
//         </Button>
//       </form>
//       <Button variant="contained" color="primary" onClick={setUserLogOut}>
//         Sign out
//       </Button>
//       <ul>
//         {todos.map((todo: Todo) => (
//           <li key={todo.id}>{todo.text}</li>
//         ))}
//       </ul> */}
//       </Box>
//     </>
//   );
// };

// export default DashboardScreen;


import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Todo {
  id: number;
  text: string;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddTodo = () => {
    if (input.trim() !== '') {
      if (editId !== null) {
        // Edit todo
        const editedTodos = todos.map(todo =>
          todo.id === editId ? { ...todo, text: input } : todo
        );
        setTodos(editedTodos);
        setEditId(null);
      } else {
        // Add new todo
        const newTodo: Todo = {
          id: Date.now(),
          text: input.trim(),
        };
        setTodos([...todos, newTodo]);
      }
      setInput('');
    }
  };

  const handleEditTodo = (id: number, text: string) => {
    setInput(text);
    setEditId(id);
  };

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={6}>
        <Paper style={{ padding: 20, marginTop: 20 }}>
          <Typography variant="h5" gutterBottom>
            Todo List
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Add Todo"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                handleAddTodo();
              }
            }}
          />
          <Button variant="contained" color="primary" onClick={handleAddTodo} style={{ marginTop: 10 }}>
            {editId !== null ? 'Update Todo' : 'Add Todo'}
          </Button>
          <Grid container spacing={2} style={{ marginTop: 20 }}>
            {todos.map(todo => (
              <Grid item xs={12} key={todo.id}>
                <Paper style={{ padding: 10 }}>
                  <Typography>{todo.text}</Typography>
                  <IconButton onClick={() => handleEditTodo(todo.id, todo.text)} size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteTodo(todo.id)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Todo;

