import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../app/lib/prisma";

interface Data {
  message?: string;
  board?: {
    id: number;
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
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust "*" to your frontend domain for security
  res.setHeader("Access-Control-Allow-Methods", "PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "PATCH") {
    const { id, newName } = req.body;

    if (!id || !newName) {
      return res.status(400).json({ error: "Missing id or newName" });
    }

    try {
      const updatedBoard = await prisma.board.update({
        where: { id: Number(id) },
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
        return res.status(404).json({ error: "Board not found" });
      }

      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["PATCH"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
