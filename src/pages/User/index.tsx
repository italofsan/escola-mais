import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { IconButton, TextField, Typography } from "@material-ui/core";
import { Search as SearchIcon, Delete as DeleteIcon } from "@material-ui/icons";

import { api } from "../../services/api";

type Todo = {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
};

export const User = () => {
  const { id } = useParams<string>();
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateTodo = async (todo: Todo) => {
    try {
      const { data } = await api.patch(`/todos/${todo.id}`, {
        completed: !todo.completed,
      });
      console.log("To do Updated", data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      const { data } = await api.delete(`/todos/${todoId}`);
      console.log("To do Deleted", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        // className={classes.formControl}
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
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </form>
      {todoList.map((todo, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <div>
            <Typography>{todo.title}</Typography>
            <Typography onClick={() => handleUpdateTodo(todo)}>
              {todo.completed ? "Completed" : "Pending"}
            </Typography>
          </div>
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
