"use client"

import { CardWithList } from "@/prisma/types"
import { useQuery } from "@tanstack/react-query"

import { fetcher } from "@/lib/fetcher"
import { useCardModal } from "@/hooks/use-card-modal"
import { Dialog, DialogContent } from "@/components/ui/dialog"

import { CardActions } from "./card-actions"
import { CardDescription } from "./card-description"
import { CardModalHeader } from "./card-modal-header"

export const CardModal = () => {
  const { isOpen, onClose, id } = useCardModal((state) => state)

  const { data: cardData, isLoading } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {isLoading && <CardModalHeader.Skeleton />}
        {cardData && <CardModalHeader cardData={cardData} />}

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
          <div className="col-span-2">
            <div className="w-full space-y-6">
              {!cardData ? (
                <CardDescription.Skeleton />
              ) : (
                <CardDescription cardData={cardData} />
              )}
            </div>
          </div>
          {cardData ? (
            <CardActions cardData={cardData} onAddCard={() => {}} />
          ) : (
            <CardActions.Skeleton />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
