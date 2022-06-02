import { FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Grid, IconButton, TextField } from "@material-ui/core";
import {
  Add as AddIcon,
  ArrowBackIos as ArrowBackIosIcon,
} from "@material-ui/icons";

import { CardToDo } from "../../components/CardToDo";

import { useStyles } from "./styles";
import { useTodo } from "../../hooks/useTodo";

export const ToDoList = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const classes = useStyles();
  const { listTodo, getTodos, handleAddTodo } = useTodo();

  const [todoTitle, setTodoTitle] = useState("");

  useEffect(() => {
    getTodos(id);
  }, [id]);

  return (
    <Grid container>
      <Grid item xs={12} className={classes.goBackContainer}>
        <IconButton size="small" onClick={() => navigate("/")}>
          <ArrowBackIosIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12} className={classes.addTodoContainer}>
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            handleAddTodo(todoTitle, id);
            setTodoTitle("");
          }}
        >
          <TextField
            label="Create a new todo"
            value={todoTitle}
            onChange={(e) => setTodoTitle(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  size="small"
                  onClick={() => {
                    handleAddTodo(todoTitle, id);
                    setTodoTitle("");
                  }}
                >
                  <AddIcon />
                </IconButton>
              ),
            }}
          />
        </form>
      </Grid>

      {listTodo.map((todo, index) => (
        <Grid item xs={12} md={4} lg={3} key={index}>
          <CardToDo todo={todo} />
        </Grid>
      ))}
    </Grid>
  );
};
