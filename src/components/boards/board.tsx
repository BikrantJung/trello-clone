import { deleteBoard } from "@/actions/delete-board"

import { Button } from "@/components/ui/button"

import { Icons } from "../icons"

interface BoardProps {
  title: string
  id: string
}
export const Board = ({ id, title }: BoardProps) => {
  return (
    <form
      action={deleteBoard.bind(null, id)}
      className="flex items-center gap-x-2"
    >
      <span className="font-mono text-sm font-semibold">{title}</span>
      <Button type="submit" size="icon" variant="destructive">
        <Icons.trash className="icon-sm" />
      </Button>
    </form>
  )
}
