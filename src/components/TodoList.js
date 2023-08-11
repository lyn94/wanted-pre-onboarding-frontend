import React, { useState } from "react";
import { deleteTodo, updateTodo } from "../lib/client/api/todoApi";

const TodoList = ({ id, isCompleted, todo, getTodo }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedValue, setEditedValue] = useState({ id, todo, isCompleted });
  const onEdit = (e) => {
    const edited = e.target.value;
    setEditedValue({ id, todo: edited, isCompleted });
  };

  const onUpdateTodo = (e) => {
    e.preventDefault();
    updateTodo(editedValue)
      .then(() => {
        setEditMode(false);
        getTodo();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onUpdateCompleted = (e) => {
    const checked = e.target.checked;
    setEditedValue({ id, todo, isCompleted: checked });
    updateTodo({ id, todo, isCompleted: checked })
      .then(() => {
        getTodo();
      })
      .catch((error) => console.log(error));
  };
  const onDelete = () => {
    deleteTodo(id)
      .then(() => {
        getTodo();
        alert("삭제되었습니다.");
      })
      .catch((error) => console.log(error));
  };
  return (
    <li className="flex flex-row items-center gap-2 justify-between w-full">
      <label className="flex flex-row gap-2 w-full">
        <input type="checkbox" checked={editedValue.isCompleted} onChange={onUpdateCompleted} />
        {editMode ? (
          <form className="flex flex-row w-full justify-between items-center gap-2" onSubmit={onUpdateTodo}>
            <input
              name="editInput"
              type="text"
              value={editedValue.todo}
              onChange={onEdit}
              className="border-[1px] w-3/4 pl-1"
              data-testid="modify-input"
            />
            <div className="flex flex-row gap-2 w-1/4">
              <button type="submit" className="bg-gray-300 w-1/2" data-testid="submit-button">
                제출
              </button>
              <button className="bg-gray-300 w-1/2" onClick={() => setEditMode(false)} data-testid="cancel-button">
                취소
              </button>
            </div>
          </form>
        ) : (
          <span className={editedValue.isCompleted ? "line-through" : "false"}>{todo}</span>
        )}
      </label>
      {editMode ? (
        <></>
      ) : (
        <div className="flex flex-row gap-2 w-1/4">
          <button className="bg-gray-300 w-1/2" onClick={() => setEditMode(true)} data-testid="modify-button">
            수정
          </button>
          <button className="bg-gray-300 w-1/2" onClick={onDelete} data-testid="delete-button">
            삭제
          </button>
        </div>
      )}
    </li>
  );
};

export default TodoList;
