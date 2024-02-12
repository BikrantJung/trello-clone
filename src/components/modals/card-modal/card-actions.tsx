"use client"

import { useParams } from "next/navigation"
import { copyCard } from "@/actions/copy-card"
import { deleteCard } from "@/actions/delete-card"
import { CardWithList } from "@/prisma/types"
import { toast } from "sonner"

import { useAction } from "@/hooks/use-action"
import { useCardModal } from "@/hooks/use-card-modal"
import { Skeleton } from "@/components/ui/skeleton"
import { FormSubmit } from "@/components/forms/form-submit"
import { Icons } from "@/components/icons"

/** List Options Component
 * Includes options like: Duplicate Card, Delete this Card
 *
 */
interface CardActionsProps {
  cardData: CardWithList
  onAddCard: () => void
}
export const CardActions = ({ cardData }: CardActionsProps) => {
  const params = useParams()
  const { onClose } = useCardModal((state) => state)
  const { execute: executeDeleteCard, statusCode } = useAction(deleteCard, {
    onSuccess() {
      toast.success("Card Deleted!")
      onClose()
    },
    onError(error) {
      toast.error(error)
    },
  })
  const { execute: executeCopyCard } = useAction(copyCard, {
    onSuccess() {
      toast.success("Card Duplicated!")
      onClose()
    },
    onError(err) {
      toast.success(err)
    },
  })
  console.log(`🔥 card-actions.tsx:46 ~ statusCode ~`, statusCode)
  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs font-semibold">Actions</p>
      <form
        action={() =>
          executeCopyCard({
            id: cardData.id,
            boardId: params.boardId as string,
            listId: cardData.listId,
          })
        }
      >
        <FormSubmit
          variant={"ghost"}
          className="h-7 w-full justify-start text-sm font-normal hover:bg-accent hover:text-accent-foreground"
        >
          <Icons.copy className="icon-sm mr-1" />
          <span>Duplicate card</span>
        </FormSubmit>
      </form>
      <form
        action={() =>
          executeDeleteCard({
            id: cardData.id,
            boardId: params.boardId as string,
          })
        }
      >
        <FormSubmit
          variant="ghost"
          className="h-7 w-full justify-start text-sm font-normal hover:bg-destructive hover:text-destructive-foreground"
        >
          <Icons.trash className="icon-sm mr-1" />
          <span> Delete card</span>
        </FormSubmit>
      </form>
    </div>
  )
}
CardActions.Skeleton = function CardActionsSkeleton() {
  return (
    <div className="mt-2  space-y-2">
      <Skeleton className="h-4 w-20 bg-muted" />
      <Skeleton className="h-8 w-full bg-muted" />
      <Skeleton className="h-8 w-full bg-muted" />
    </div>
  )
}
