import React, { useState } from "react";

const TodoList = ({ id, done, text, onComplete, onDelete, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState({ id, text, done });
  const onEdit = (e) => {
    const editedText = e.target.value;
    setEditValue({ id, text: editedText, done });
  };
const isUpdate = (e, editValue) => {
  onUpdate(e, editValue);
  setEditMode(false);
}
  return (
    <li className="flex flex-row items-center gap-2 justify-between w-full">
      <label className="flex flex-row gap-2 w-full">
        <input type="checkbox" defaultChecked={done ? true : false} onChange={() => onComplete(id)} />
        {editMode ? (
          <form className="flex flex-row w-full justify-between items-center gap-2" 
          onSubmit={(e) => isUpdate(e, editValue)}
          >
            <input
              name="editInput"
              type="text"
              value={editValue.text}
              onChange={onEdit}
              className="border-[1px] w-3/4 pl-1"
              data-testid="modify-input"
            />
            <div className="flex flex-row gap-2 w-1/4">
              <button
                type="submit"
                className="bg-gray-300 w-1/2"
                data-testid="submit-button"
              >
                제출
              </button>
              <button className="bg-gray-300 w-1/2" onClick={() => setEditMode(false)} data-testid="cancel-button">
                취소
              </button>
            </div>
          </form>
        ) : (
          <span className={done && "line-through"}>{text}</span>
        )}
      </label>
      {editMode ? (
        <></>
      ) : (
        <div className="flex flex-row gap-2 w-1/4">
          <button className="bg-gray-300 w-1/2" onClick={() => setEditMode(true)} data-testid="modify-button">
            수정
          </button>
          <button className="bg-gray-300 w-1/2" onClick={() => onDelete(id)} data-testid="delete-button">
            삭제
          </button>
        </div>
      )}
    </li>
  );
};

export default TodoList;
