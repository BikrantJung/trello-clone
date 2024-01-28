"use server"

import { revalidatePath } from "next/cache"
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
  //   TODO: Make org_id dynamic
  revalidatePath("/organization/org_2bSKbVfkRzaiJVN5TO2UngRRPH0")
}
