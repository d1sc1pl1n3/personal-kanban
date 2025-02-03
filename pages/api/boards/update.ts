import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // Creates a new Prisma instance

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
  if (req.method === "PATCH") {
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
          id: updatedBoard.id,
          name: updatedBoard.name,
          createdAt: updatedBoard.createdAt.toISOString(),
          updatedAt: updatedBoard.updatedAt.toISOString(),
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
      await prisma.$disconnect(); // Disconnect Prisma after each request
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
