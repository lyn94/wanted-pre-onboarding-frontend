import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Todo from "../pages/Todo";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/todo" element={<Todo />}></Route>
    </Routes>
  );
};

export default Routing;
