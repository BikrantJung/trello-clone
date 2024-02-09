import { Metadata } from "next"
import Image from "next/image"
import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs"
import { startCase } from "lodash"

import { db } from "@/lib/db"

import { BoardNavbar } from "../_components/board-navbar"

export async function generateMetadata({
  params,
}: {
  params: { boardId: string }
}): Promise<Metadata> {
  const { orgId } = auth()
  if (!orgId) {
    return {
      title: "Board",
    }
  }
  const board = await await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  })
  return {
    title: startCase(board?.title || "board"),
  }
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode
  params: { boardId: string }
}) => {
  const { orgId } = auth()

  if (!orgId) {
    redirect("/select-org")
  }
  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  })

  if (!board) {
    redirect(`/organiation/${orgId}`)
  }

  return (
    <div className="relative h-full flex-1">
      <BoardNavbar board={board} />
      <Image
        src={board.imageFullUrl}
        alt={`${board.title}'s image`}
        fill
        className="absolute inset-0 -z-10 object-cover object-center brightness-75 filter"
      />
      {/* <div className="absolute inset-0 bg-black/30"></div> */}
      <main className="relative h-full pt-28">{children}</main>
    </div>
  )
}

export default BoardIdLayout
