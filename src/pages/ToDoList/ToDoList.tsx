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
import { errorMessage, successMessage } from "../../components/Messages";

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
      setTodoList([...todoList, data]);
      setTodoTitle("");
      successMessage("Todo created gracefully!");
    } catch (error) {
      console.log(error);
      errorMessage("It wasn't possible create a new todo!");
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
      successMessage("Todo updated gracefully!");
    } catch (error) {
      console.log(error);
      errorMessage("It wasn't possible update the todo!");
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      await api.delete(`/todos/${todoId}`);
      let todoListCopy = [...todoList];
      todoListCopy = todoListCopy.filter((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }
      });
      setTodoList(todoListCopy);
      successMessage("Todo deleted!");
      errorMessage("Todo created gracefully!");
    } catch (error) {
      console.log(error);
      errorMessage("It wasn't possible delete the todo!");
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
