import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      const board = await prisma.board.delete({
        where: { id },
      });
      res.status(200).json(board);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete board" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}