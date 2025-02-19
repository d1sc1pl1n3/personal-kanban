"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../components/Button";

const CreateBoardPage: React.FC = () => {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/boards/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      router.push("/boards");
    } else {
      console.error("Failed to create board");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold mb-4">Create a New Board</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block title-medium-14 mb-2" htmlFor="name">
            Board Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 title-medium-12 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Board
        </Button>
      </form>
    </div>
  );
};

export default CreateBoardPage;
