"use server"

import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { Board } from "@prisma/client"

import { ActionState } from "@/lib/create-safe-action"
import { db } from "@/lib/db"

export const getBoards = async (): Promise<ActionState<unknown, Board[]>> => {
  const { userId, orgId } = auth()
  if (!userId) {
    return {
      error: "Unauthorized",
      statusCode: 401,
    }
  }
  if (!orgId) redirect("/select-org")
  try {
    const board = await db.board.findMany({
      where: { orgId },
      orderBy: { createdAt: "desc" },
    })

    return { data: board }
  } catch (error) {
    return {
      error: "Failed to fetch.",
      statusCode: 500,
    }
  }
}
