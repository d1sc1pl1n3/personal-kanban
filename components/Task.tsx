import React from "react";
import { TaskType } from "../app/types/TaskType";

type TaskProps = {
  task: TaskType;
};

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-2 m-2">
      <h3 className="text-lg font-bold">{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};

export default Task;
