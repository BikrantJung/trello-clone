import { createBoard } from "@/actions/create-board"

import { db } from "@/lib/db"
import { Board } from "@/components/boards/board"

const OrganizationIdPage = async () => {
  const allBoards = await db.board.findMany()
  return (
    <div className="flex flex-col space-y-4">
      <form action={createBoard}>
        <input
          title="title"
          name="title"
          placeholder="title..."
          required
          className="border border-primary p-1"
        />
      </form>
      <div className="space-y-2">
        {allBoards.map((board) => (
          <Board key={board.id} title={board.title} id={board.id} />
        ))}
      </div>
    </div>
  )
}

export default OrganizationIdPage
