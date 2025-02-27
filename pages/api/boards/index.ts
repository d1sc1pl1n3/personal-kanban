import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../app/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*"); // Change "*" to your frontend domain for security
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const boards = await prisma.board.findMany();
      res.status(200).json(boards);
    } catch (error: any) {
      console.error("Error fetching boards:", error.message || error);
      res
        .status(500)
        .json({ error: error.message || "Failed to fetch boards" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
