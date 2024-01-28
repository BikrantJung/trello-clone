"use server"

import { z } from "zod"

import { db } from "@/lib/db"

const ZCreateBoard = z.object({
  title: z.string().min(1),
})

export async function createBoard(formData: FormData) {
  const { title } = ZCreateBoard.parse({
    title: formData.get("title"),
  })
  await db.board.create({
    data: {
      title,
    },
  })
}
