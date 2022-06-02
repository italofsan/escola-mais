import { CssBaseline } from "@material-ui/core";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ToDoContextProvider } from "./contexts/ToDoContext";

import { Paths } from "./paths";

export function App() {
  return (
    <ToDoContextProvider>
      <CssBaseline />
      <Paths />
      <ToastContainer limit={3} transition={Slide} />
    </ToDoContextProvider>
  );
}
