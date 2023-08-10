import React, { useEffect } from "react";
import { Route, Routes, redirect, useLocation, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Todo from "../pages/Todo";

const Routing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/signin" || location.pathname === "/signup") {
      if (localStorage.getItem("access_token")) {
        alert("로그인 상태입니다.");
        navigate("/todo");
      }
    }
  }, [location]);
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
