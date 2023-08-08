import React, { useState } from "react";
import { cls } from "../lib/common/utils";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";

const Todo = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, text: "Enter your to do something.", done: true },
    { id: 2, text: "drink a cup of coffee", done: false },
  ]);
  const addToList = (text) => {
    setTodoList([
      ...todoList,
      {
        id: Math.random() * 100000000,
        text: text,
        done: false,
      },
    ]);
  };

  const onComplete = (id) => {
    setTodoList(todoList.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };
  const onUpdate = (e, updateValue) => {
    e.preventDefault();
    setTodoList(todoList.map((todo) => (todo.id === updateValue.id ? {...todo, text: updateValue.text } : todo)))
  }
  const onDelete = (id) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col gap-2 justify-center mx-auto w-full">
      <AddTodo addToList={addToList} />
      {/* Todo list */}
      <div className="flex flex-col gap-2">
        {!todoList.length ? (
          <p>할 일을 추가해보세요.</p>
        ) : (
          todoList.map((todo) => {
            return <TodoList key={todo.id} id={todo.id} text={todo.text} done={todo.done} onComplete={onComplete} onDelete={onDelete} onUpdate={onUpdate} />;
          })
        )}
      </div>
    </div>
  );
};

export default Todo;
