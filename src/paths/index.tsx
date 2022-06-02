import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { User } from "../pages/User";

export const Paths = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users/:id" element={<User />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
