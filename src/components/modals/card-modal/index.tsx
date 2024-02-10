"use client"

import { CardWithList } from "@/prisma/types"
import { useQuery } from "@tanstack/react-query"

import { fetcher } from "@/lib/fetcher"
import { useCardModal } from "@/hooks/use-card-modal"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export const CardModal = () => {
  const { isOpen, onClose, id } = useCardModal((state) => state)

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>{cardData?.title}</DialogContent>
    </Dialog>
  )
}
