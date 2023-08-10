import React, { useState } from "react";
import { createTodo } from "../lib/client/api/todoApi";

const AddTodo = ({ getTodo }) => {
  const [todoText, setTodoText] = useState("");
  const onAdd = (e) => {
    e.preventDefault();
    if (!todoText) {
      alert("내용을 입력해주세요.");
      return;
    }
    createTodo({ todo: todoText, isComplete: false })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setTodoText("");
          getTodo();
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <form className="flex flex-row gap-2 w-full" onSubmit={onAdd} name="addForm">
      <input
        type="text"
        className="border-[1px] px-2 w-3/4"
        data-testid="new-todo-input"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-orange-300 px-4 border-orange-300 border-[1px] w-1/4"
        data-testid="new-todo-add-button"
      >
        추가
      </button>
    </form>
  );
};

export default AddTodo;
