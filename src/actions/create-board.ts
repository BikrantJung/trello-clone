"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

import { db } from "@/lib/db"

import { CreateBoardStateType } from "./actions.types"

const ZCreateBoard = z.object({
  title: z.string().min(3, {
    message: "Minimum 3 characters required",
  }),
})

export async function createBoard(
  prevState: CreateBoardStateType,
  formData: FormData
) {
  const validatedFields = ZCreateBoard.safeParse({
    title: formData.get("title"),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields.",
    }
  }
  const { title } = validatedFields.data
  try {
    await db.board.create({
      data: {
        title,
      },
    })
  } catch (error) {
    return {
      message: "Database Error",
    }
  }
  //   TODO: Make org_id dynamic
  revalidatePath("/organization/org_2bSKbVfkRzaiJVN5TO2UngRRPH0")
  redirect("/organization/org_2bSKbVfkRzaiJVN5TO2UngRRPH0")
}
