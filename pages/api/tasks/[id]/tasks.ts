import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../app/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const tasks = await prisma.task.findMany({
        where: { boardId: parseInt(id as string) },
      });
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  } else if (req.method === "POST") {
    const { title, description } = req.body;
    try {
      const task = await prisma.task.create({
        data: {
          title,
          description,
          boardId: parseInt(id as string),
        },
      });
      res.status(201).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create task" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
