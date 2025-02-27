import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../app/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Adjust "*" to specific domains for better security
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests (for OPTIONS method)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const { name } = req.body;
    console.log("name", name);

    try {
      const board = await prisma.board.create({
        data: { name },
      });
      console.log("board", board);
      res.status(201).json(board);
    } catch (error: any) {
      console.error("Error creating board:", error.message || error);
      res
        .status(500)
        .json({ error: error.message || "Failed to create board" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
