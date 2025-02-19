"use client";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Board from "./Board";
import { BoardType } from "../types/BoardType";

type BoardsContainerProps = {
  boards: BoardType[];
  onDelete?: (id: number) => void; // TODO: remove and from parent
  onDragEnd: (updatedBoards: BoardType[]) => void;
  handleBoards: (updatedBoards: BoardType[]) => void;
};

const BoardsContainer: React.FC<BoardsContainerProps> = ({
  boards,
  handleBoards,
  onDragEnd,
  // onDelete,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const reorderedBoards = [...boards];
    const [movedBoard] = reorderedBoards.splice(source.index, 1);
    reorderedBoards.splice(destination.index, 0, movedBoard);

    if (JSON.stringify(reorderedBoards) !== JSON.stringify(boards)) {
      onDragEnd(reorderedBoards);
    }
  };

  const moveItem = (direction) => {
    if (focusedIndex === null) return;
    const newIndex = focusedIndex + direction;
    if (newIndex < 0 || newIndex >= boards.length) return;

    const updatedBoards = [...boards];
    const [movedBoard] = updatedBoards.splice(focusedIndex, 1);
    updatedBoards.splice(newIndex, 0, movedBoard);

    handleBoards(updatedBoards);
    setFocusedIndex(newIndex);
  };

  const handleKeyDown = (event, index) => {
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        moveItem(-1);
        event.preventDefault();
        break;
      case "ArrowRight":
      case "ArrowDown":
        moveItem(1);
        event.preventDefault();
        break;
      case "Enter":
      case " ":
        setFocusedIndex(index);
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const handleUpdate = async (id: number, newName: string) => {
    console.log("handleUpdate called with:", id, newName);

    try {
      const response = await fetch("/api/boards/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, newName }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update the local state with the updated board
        handleBoards(
          boards.map((board) =>
            board.id === id ? { ...board, name: data.board.name } : board
          )
        );
      } else {
        const errorData = await response.json();
        console.error("Failed to update board name:", errorData.error);
        setErrorMessage("Failed to update board name.");
      }
    } catch (error) {
      console.error("An error occurred while updating the board:", error);
      setErrorMessage("An error occurred while updating the board.");
    }
  };

  const onDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/boards/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        handleBoards(boards.filter((board) => Number(board.id) !== id));
      } else {
        const errorData = await response.json();
        console.error("Failed to delete board:", errorData.error);
        setErrorMessage("Failed to delete board.");
      }
    } catch (error) {
      console.error("An error occurred while deleting the board:", error);
      setErrorMessage("An error occurred while deleting the board.");
    }
  };

  return (
    <>
      {errorMessage && (
        <div role="alert" aria-live="assertive">
          <p>{errorMessage}</p>
        </div>
      )}

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
              aria-live="polite"
            >
              {boards.map((board, index) => (
                <Draggable
                  key={board.id.toString()}
                  draggableId={board.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      aria-roledescription="draggable item"
                      aria-label={`Board ${board.name}`}
                      tabIndex={0}
                      onKeyDown={(event) => handleKeyDown(event, index)}
                      className={
                        snapshot.isDragging || index === focusedIndex
                          ? "border border-blue-500 shadow-lg"
                          : ""
                      }
                    >
                      <Board
                        board={board}
                        onDelete={onDelete}
                        onUpdate={handleUpdate}
                      />
                      <span className="sr-only">{board.id}</span>{" "}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default BoardsContainer;
