import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Data {
  message?: string;
  board?: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { id, newName } = req.body;

    if (!id || !newName) {
      return res.status(400).json({ error: "Missing id or newName" });
    }

    try {
      const updatedBoard = await prisma.board.update({
        where: { id },
        data: { name: newName },
      });

      return res.status(200).json({
        message: "Board name updated successfully",
        board: {
          id: updatedBoard.id.toString(),
          name: updatedBoard.name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    } catch (error: any) {
      console.error("Error updating board:", error);

      if (error.code === "P2025") {
        // Prisma error code for record not found
        return res.status(404).json({ error: "Board not found" });
      }

      return res.status(500).json({ error: "Internal Server Error" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
