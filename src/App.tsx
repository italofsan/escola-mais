import { CssBaseline } from "@material-ui/core";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Paths } from "./paths";

export function App() {
  return (
    <>
      <CssBaseline />
      <Paths />
      <ToastContainer limit={3} transition={Slide} />
    </>
  );
}
