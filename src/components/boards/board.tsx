interface BoardProps {
  href: string
}
export const Board = ({ href }: BoardProps) => {
  return (
    <div className="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm border border-border bg-accent/10 hover:border-accent ">
      Board
    </div>
  )
}
