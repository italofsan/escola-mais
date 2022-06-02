import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { CheckboxProps } from "@material-ui/core/Checkbox";
import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";

import { api } from "../../services/api";
import { Todo } from "../../types";

import { useStyles } from "./styles";

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export const User = () => {
  const { id } = useParams<string>();
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
      const { data } = await api.patch(`/todos/${todoSelected.id}`, {
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
    <div>
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
              <IconButton size="small" onClick={() => handleAddTodo(todoTitle)}>
                <AddIcon />
              </IconButton>
            ),
          }}
        />
      </form>
      {todoList.map((todo, index) => (
        <div key={index} className={classes.todoContainer}>
          <div className={classes.todoContent}>
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={todo.completed}
                  onChange={() => handleUpdateTodo(todo)}
                />
              }
              label=""
            />
          </div>
          <Typography>{todo.title}</Typography>
          {/* <Typography onClick={() => handleUpdateTodo(todo)}>
              {todo.completed ? "Completed" : "Pending"}
            </Typography> */}
          <div>
            <IconButton size="small" onClick={() => handleDeleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        </div>
      ))}
    </div>
  );
};
