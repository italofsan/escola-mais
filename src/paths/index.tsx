import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { ToDoList } from "../pages/ToDoList";

export const Paths = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users/:id" element={<ToDoList />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
