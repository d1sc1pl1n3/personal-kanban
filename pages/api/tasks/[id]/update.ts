import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../app/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { title, description } = req.body;

    try {
      const taskId = parseInt(id as string);
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          title,
          description,
        },
      });

      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update task" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
