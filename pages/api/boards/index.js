import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const boards = await prisma.board.findMany();
      res.status(200).json(boards);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch boards" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}