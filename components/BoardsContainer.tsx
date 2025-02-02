// isDropDisabled={false}
// isCombineEnabled={false}
// ignoreContainerClipping={false} // ✅ Add this

"use client";
import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BoardType } from "../types/BoardType";
import Board from "./Board";

type BoardsContainerProps = {
  boards: BoardType[];
  onDelete: (id: number) => void;
  onDragEnd: (updatedBoards: BoardType[]) => void;
};

const BoardsContainer: React.FC<BoardsContainerProps> = ({
  boards,
  onDelete,
  onDragEnd,
}) => {
  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;

    // Create a new array to prevent mutating state directly
    const reorderedBoards = [...boards];
    const [movedBoard] = reorderedBoards.splice(source.index, 1);
    reorderedBoards.splice(destination.index, 0, movedBoard);

    // Update state only if order has changed
    if (JSON.stringify(reorderedBoards) !== JSON.stringify(boards)) {
      onDragEnd(reorderedBoards);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId="boards"
        direction="horizontal"
        isDropDisabled={false}
        isCombineEnabled={false}
        ignoreContainerClipping={false}
      >
        {(provided) => (
          <div
            className="flex flex-wrap justify-start items-start h-screen overflow-y-auto p-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {boards.map((board, index) => (
              <Draggable
                key={board.id.toString()}
                draggableId={board.id.toString()}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <>
                      <Board board={board} onDelete={onDelete} />
                      <pre>{JSON.stringify(board.id)}</pre>
                    </>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BoardsContainer;
