import { useContext } from "react";
import { ToDoContext } from "../contexts/ToDoContext";

export function useTodo() {
  const value = useContext(ToDoContext);

  return value;
}
