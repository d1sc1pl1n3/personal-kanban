import React from "react";
import { TaskType } from "../app/types/TaskType";

type TaskProps = {
  task: TaskType;
};

const Task: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className="bg-gray-100 shadow-md rounded-sm p-2 m-2 w-full">
      <h3 className="title-medium-14">{task.title}</h3>
      <div className="pl-2">
        <p>{task.description}</p>
      </div>
    </div>
  );
};

export default Task;
