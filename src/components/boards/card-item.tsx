import { Card } from "@prisma/client"

interface CardItemProps {
  index: number
  card: Card
}
export const CardItem = ({ index, card }: CardItemProps) => {
  return (
    <div
      role="button"
      className="truncate rounded-md border-2 border-transparent bg-background px-3 py-2 text-sm shadow-sm hover:border-foreground dark:bg-muted"
    >
      {card.title}
    </div>
  )
}
