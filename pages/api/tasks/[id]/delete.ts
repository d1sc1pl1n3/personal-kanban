import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const taskId = parseInt(id as string);
      const deletedTask = await prisma.task.delete({
        where: { id: taskId },
      });
      res.status(200).json({
        message: "Task deleted successfully",
        task: deletedTask,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete task" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
