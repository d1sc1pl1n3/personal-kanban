import { NextApiRequest, NextApiResponse } from "next";
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
  res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust "*" to your frontend domain for better security
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Invalid or missing 'name'" });
    }

    try {
      const board = await prisma.board.create({
        data: { name },
      });

      return res.status(201).json({
        message: "Board created successfully",
        board: {
          id: board.id,
          name: board.name,
          createdAt: board.createdAt.toISOString(),
          updatedAt: board.updatedAt.toISOString(),
        },
      });
    } catch (error: any) {
      console.error("Error creating board:", error);

      return res.status(500).json({
        error: error.message || "Internal Server Error",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
