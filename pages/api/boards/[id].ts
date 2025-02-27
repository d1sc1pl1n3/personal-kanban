import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../app/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name } = req.body;
    console.log("name", name);

    try {
      const board = await prisma.board.create({
        data: { name },
      });
      console.log("board", board);
      res.status(201).json(board);
    } catch (error) {
      console.error("error", error);
      res.status(500).json({ message: "Failed to create board" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
