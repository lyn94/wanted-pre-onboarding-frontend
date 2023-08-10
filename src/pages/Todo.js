import React, { useEffect, useState } from "react";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { getTodos } from "../lib/client/api/todoApi";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const getTodo = () => {
    getTodos()
    .then((res) => {
      setTodoList(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="flex flex-col gap-2 justify-center mx-auto w-full">
      <AddTodo getTodo={getTodo} />
      <div className="flex flex-col gap-2">
        {!todoList.length ? (
          <p>할 일을 추가해보세요.</p>
        ) : (
          todoList.map((todo) => {
            return (
              <TodoList
                key={todo.id}
                id={todo.id}
                todo={todo.todo}
                isCompleted={todo.isCompleted}
                getTodo={getTodo}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Todo;
