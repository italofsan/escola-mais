import { FormEvent, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Grid, IconButton, TextField } from "@material-ui/core";
import {
  Add as AddIcon,
  ArrowBackIos as ArrowBackIosIcon,
} from "@material-ui/icons";

import { api } from "../../services/api";
import { Todo } from "../../types";

import { CardToDo } from "../../components/CardToDo";

import { useStyles } from "./styles";

export const ToDoList = () => {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const classes = useStyles();

  const [todoList, setTodoList] = useState<Todo[]>([]);

  const [todoTitle, setTodoTitle] = useState("");

  const getTodos = async (id?: string) => {
    if (id) {
      try {
        const { data } = await api.get(`/todos?userId=${id}`);
        setTodoList(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getTodos(id);
  }, [id]);

  const handleAddTodo = async (todoTitle: string) => {
    try {
      const { data } = await api.post("/todos", {
        title: todoTitle,
        completed: false,
        userId: id,
      });
      console.log("To do added", data);
      setTodoList([...todoList, data]);
      setTodoTitle("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTodo = async (todoSelected: Todo) => {
    try {
      await api.patch(`/todos/${todoSelected.id}`, {
        completed: !todoSelected.completed,
      });
      let todoListCopy = [...todoList];
      todoListCopy = todoListCopy.map((todo) => {
        if (todo.id === todoSelected.id) {
          return {
            ...todo,
            completed: !todoSelected.completed,
          };
        } else {
          return todo;
        }
      });
      setTodoList(todoListCopy);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      const { data } = await api.delete(`/todos/${todoId}`);
      console.log("To do Deleted", data);
      let todoListCopy = [...todoList];
      todoListCopy = todoListCopy.filter((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }
      });
      setTodoList(todoListCopy);
    } catch (error) {
      console.log(error);
    }
  };

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
            handleAddTodo(todoTitle);
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
                  onClick={() => handleAddTodo(todoTitle)}
                >
                  <AddIcon />
                </IconButton>
              ),
            }}
          />
        </form>
      </Grid>

      {todoList.map((todo, index) => (
        <Grid item xs={12} md={4} lg={3} key={index}>
          <CardToDo
            todo={todo}
            handleUpdateTodo={handleUpdateTodo}
            handleDeleteTodo={handleDeleteTodo}
          />
        </Grid>
      ))}
    </Grid>
  );
};
