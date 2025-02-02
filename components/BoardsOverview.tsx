import React, { useState, useEffect } from "react";
import Board from "./Board";
import Link from "next/link";

type BoardType = {
  id: string;
  name: string;
  // Add other fields as necessary
};

const BoardsOverview: React.FC = () => {
  const [boards, setBoards] = useState<BoardType[]>([]);

  useEffect(() => {
    // Fetch boards from your API
    const fetchBoards = async () => {
      const response = await fetch("/api/boards");
      const data = await response.json();
      if (response.ok) {
        setBoards(data.boards);
      }
    };
    fetchBoards();
  }, []);

  const handleUpdate = async (id: string, newName: string) => {
    const response = await fetch("/api/boards/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, newName }),
    });

    if (response.ok) {
      const data = await response.json();
      // Update your state with data.board
      setBoards((prevBoards) =>
        prevBoards.map((board) =>
          board.id === id ? { ...board, name: data.board.name } : board
        )
      );
    } else {
      const errorData = await response.json();
      console.error("Failed to update board name:", errorData.error);
      // Optionally, handle the error (e.g., show a notification)
    }
  };

  const handleDelete = async (id: string) => {
    // Make API call to delete the board
    const response = await fetch(`/api/boards/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
    } else {
      // Handle error (optional)
      console.error("Failed to delete board");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Boards Overview</h1>
      <ul className="flex flex-wrap">
        {boards.map((board) => (
          <li key={board.id}>
            <Board
              board={{ ...board, id: parseInt(board.id) }}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </li>
        ))}
      </ul>
      <Link href="/create">
        <a className="mt-4 inline-block text-blue-500 hover:underline">
          Create a new board
        </a>
      </Link>
    </div>
  );
};

export default BoardsOverview;
