import React from "react";
import { BoardType } from "../types/BoardType";

type BoardProps = {
  board: BoardType;
  onDelete: (id: number) => void;
};

const Board: React.FC<BoardProps> = ({ board, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-64">
      <h2 className="text-xl font-bold mb-2">{board.name}</h2>
      {/* Add other board details here */}
      <button
        onClick={() => onDelete(board.id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Delete
      </button>
    </div>
  );
};

export default Board;
