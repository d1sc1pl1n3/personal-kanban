"use client";
import React, { useEffect, useState } from "react";
import { BoardType } from "../../types/BoardType";
import BoardsContainer from "../../components/BoardsContainer";

const BoardsPage: React.FC = () => {
  const [boards, setBoards] = useState<BoardType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBoards = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }
    try {
      const response = await fetch("/api/boards");
      const data = await response.json();
      if (JSON.stringify(data) !== JSON.stringify(boards)) {
        setBoards(data);
      }
    } catch (error) {
      console.error("Failed to fetch boards", error);
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  };

  // const deleteBoard = async (id: number) => {
  //   try {
  //     const response = await fetch(`/api/boards/${id}`, {
  //       method: "DELETE",
  //     });
  //     if (response.ok) {
  //       fetchBoards(false); // Re-fetch boards without showing loading
  //     } else {
  //       console.error("Failed to delete board");
  //     }
  //   } catch (error) {
  //     console.error("Failed to delete board", error);
  //   }
  // };

  const handleDragEnd = (updatedBoards: BoardType[]) => {
    setBoards(updatedBoards);
  };

  useEffect(() => {
    fetchBoards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-2 p-4">
      <h1 className="title-medium-14 text-center">Boards</h1>
      <BoardsContainer
        boards={boards}
        // onDelete={deleteBoard}
        onDragEnd={handleDragEnd}
        handleBoards={setBoards}
      />
    </div>
  );
};

export default BoardsPage;
