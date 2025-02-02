import React, { useState } from "react";
import { BoardType } from "../types/BoardType";

type BoardProps = {
  board: BoardType;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newName: string) => void;
};

const Board: React.FC<BoardProps> = ({ board, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(board.name);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleBlur = () => {
    if (editedName.trim() && editedName !== board.name) {
      onUpdate(String(board.id), editedName);
    } else {
      setEditedName(board.name);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    } else if (e.key === "Escape") {
      setEditedName(board.name);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-64">
      {isEditing ? (
        <input
          type="text"
          value={editedName}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className="text-xl font-bold mb-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
      ) : (
        <h2
          className="text-xl font-bold mb-2 cursor-pointer"
          onDoubleClick={handleDoubleClick}
        >
          {board.name}
        </h2>
      )}
      {/* Add other board details here */}
      <button
        onClick={() => onDelete(String(board.id))}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Delete
      </button>
    </div>
  );
};

export default Board;
