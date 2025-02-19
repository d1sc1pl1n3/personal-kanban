import React, { useState, useEffect } from "react";
import { BoardType } from "../types/BoardType";
import Task from "./Task";
import { TaskType } from "../app/types/TaskType";

type BoardProps = {
  board: BoardType;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newName: string) => void;
};

const Board: React.FC<BoardProps> = ({ board, onDelete }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`/api/tasks/${board.id}`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/tasks/${board.id}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: taskTitle,
          description: taskDescription,
        }),
      });

      if (response.ok) {
        const newTask = await response.json();
        console.log("Task created:", newTask);
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTaskTitle("");
        setTaskDescription("");
      } else {
        console.error("Failed to create task");
      }
    } catch (error) {
      console.error("An error occurred while creating the task:", error);
    }
  };

  // New handler for deleting a task using the API route
  const handleDeleteTask = async (taskId: number) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/delete`, {
        method: "DELETE",
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Task deleted:", result);
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-64">
      <h2 className="text-xl font-bold mb-2">{board.name}</h2>
      <button
        onClick={() => onDelete(board.id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Delete Board
      </button>
      <form onSubmit={handleAddTask} className="mt-4">
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="taskTitle"
          >
            Task Title
          </label>
          <input
            type="text"
            id="taskTitle"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-1"
            htmlFor="taskDescription"
          >
            Task Description
          </label>
          <textarea
            id="taskDescription"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Task
        </button>
      </form>
      <div className="mt-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between">
            <Task task={task} />
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
            >
              Delete Task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Board;
