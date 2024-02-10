import { useRef, useState } from "react"
import { useParams } from "next/navigation"
import { updateCard } from "@/actions/update-card"
import { CardWithList } from "@/prisma/types"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { useAction } from "@/hooks/use-action"
import { Skeleton } from "@/components/ui/skeleton"
import { FormInput } from "@/components/forms/form-input"
import { Icons } from "@/components/icons"

interface CardModalHeaderProps {
  cardData: CardWithList
}
export const CardModalHeader = ({ cardData }: CardModalHeaderProps) => {
  const [cardTitle, setCardTitle] = useState<string>(cardData.title)
  const [description, setDescription] = useState<string | null>(
    cardData.description
  )
  const { execute } = useAction(updateCard, {
    onSuccess: (data) => {
      toast.success("Card updated!")
      queryClient.invalidateQueries({
        queryKey: ["card", cardData.id],
      })
      setCardTitle(data.title)
    },
    onError: (err) => {
      toast.error(err)
    },
  })

  const queryClient = useQueryClient()
  const params = useParams()
  const inputRef = useRef<HTMLInputElement>(null)

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit()
  }

  function handleSubmit() {
    const boardId = params.boardId as string
    if (cardData.title !== cardTitle) {
      execute({ boardId, title: cardTitle, id: cardData.id, description })
      // TODO: Update database
    }
  }
  return (
    <div className="mb-6 flex w-full items-start gap-x-3">
      <Icons.layout className="mt-1 h-5 w-5" />
      <div className="w-full">
        <form action={handleSubmit}>
          <FormInput
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            value={cardTitle}
            onChange={(text) => setCardTitle(text)}
            type="text"
            className="relative -left-1.5 mb-0.5 w-[95%] truncate border-transparent bg-transparent px-1 text-xl font-semibold  focus-visible:border-input focus-visible:bg-white"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="font-semibold">{cardData.list.title}</span>
        </p>
      </div>
    </div>
  )
}
CardModalHeader.Skeleton = function CardModalHeaderSkeleton() {
  return (
    <div className="mb-6 flex w-full items-start gap-x-3">
      <Skeleton className="mt-1 h-6 w-6 bg-muted" />
      <div>
        <Skeleton className="mb-1 h-6 w-24 bg-muted" />
        <Skeleton className="h-4 w-12  bg-muted" />
      </div>
    </div>
  )
}
