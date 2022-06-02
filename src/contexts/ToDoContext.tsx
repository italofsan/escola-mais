import { createContext, ReactNode, useCallback, useState } from "react";
import { errorMessage, successMessage } from "../components/Messages";
import { api } from "../services/api";
import { Todo } from "../types";

interface ToDoContextProps {
  listTodo: Todo[];
  getTodos: (id?: string) => Promise<void>;
  handleAddTodo: (todoTitle: string, userId?: string) => Promise<void>;
  handleUpdateTodo: (todoSelected: Todo) => Promise<void>;
  handleDeleteTodo: (todoId: number) => Promise<void>;
}

interface ToDoContextProviderProps {
  children: ReactNode;
}

export const ToDoContext = createContext<ToDoContextProps>(
  {} as ToDoContextProps
);

export function ToDoContextProvider({ children }: ToDoContextProviderProps) {
  const [listTodo, setListTodo] = useState<Todo[]>([]);

  const getTodos = async (id?: string) => {
    if (id) {
      try {
        const { data } = await api.get(`/todos?userId=${id}`);
        setListTodo(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAddTodo = useCallback(
    async (todoTitle: string, userId?: string) => {
      try {
        const { data } = await api.post("/todos", {
          title: todoTitle,
          completed: false,
          userId: userId,
        });
        setListTodo([...listTodo, data]);
        successMessage("Todo created gracefully!");
      } catch (error) {
        console.log(error);
        errorMessage("It wasn't possible create a new todo!");
      }
    },
    [listTodo]
  );

  const handleUpdateTodo = useCallback(
    async (todoSelected: Todo) => {
      try {
        await api.patch(`/todos/${todoSelected.id}`, {
          completed: !todoSelected.completed,
        });
        let listTodoCopy = [...listTodo];
        listTodoCopy = listTodoCopy.map((todo) => {
          if (todo.id === todoSelected.id) {
            return {
              ...todo,
              completed: !todoSelected.completed,
            };
          } else {
            return todo;
          }
        });
        setListTodo(listTodoCopy);
        successMessage("Todo updated gracefully!");
      } catch (error) {
        console.log(error);
        errorMessage("It wasn't possible update the todo!");
      }
    },
    [listTodo]
  );

  const handleDeleteTodo = useCallback(
    async (todoId: number) => {
      try {
        await api.delete(`/todos/${todoId}`);
        let listTodoCopy = [...listTodo];
        listTodoCopy = listTodoCopy.filter((todo) => {
          if (todo.id !== todoId) {
            return todo;
          }
        });
        setListTodo(listTodoCopy);
        successMessage("Todo deleted!");
      } catch (error) {
        console.log(error);
        errorMessage("It wasn't possible delete the todo!");
      }
    },
    [listTodo]
  );

  return (
    <ToDoContext.Provider
      value={{
        listTodo,
        getTodos,
        handleAddTodo,
        handleUpdateTodo,
        handleDeleteTodo,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
}
