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

  const deleteBoard = async (id: number) => {
    try {
      const response = await fetch(`/api/boards/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchBoards(false); // Re-fetch boards without showing loading
      } else {
        console.error("Failed to delete board");
      }
    } catch (error) {
      console.error("Failed to delete board", error);
    }
  };

  const handleDragEnd = (updatedBoards: BoardType[]) => {
    setBoards(updatedBoards);
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-4">Boards</h1>
      <BoardsContainer
        boards={boards}
        onDelete={deleteBoard}
        onDragEnd={handleDragEnd}
        handleBoards={setBoards}
      />
    </div>
  );
};

export default BoardsPage;
