import { Prisma } from "@prisma/client"

export type ListWithCards = Prisma.ListGetPayload<{
  include: {
    cards: true
  }
}>
export type CardWithList = Prisma.CardGetPayload<{
  include: {
    list: true
  }
}>
