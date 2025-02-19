import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      // Assuming task id is numeric. If your task id is a string, remove parseInt.
      const taskId = parseInt(id, 10);
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