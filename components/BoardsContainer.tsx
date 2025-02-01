import React from "react";
import { BoardType } from "../types/BoardType";
import Board from "./Board";

type BoardsContainerProps = {
  boards: BoardType[];
  onDelete: (id: number) => void;
};

const BoardsContainer: React.FC<BoardsContainerProps> = ({
  boards,
  onDelete,
}) => {
  return (
    <div className="flex flex-wrap justify-start items-start h-screen overflow-y-auto p-4">
      {boards.map((board) => (
        <Board key={board.id} board={board} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BoardsContainer;
