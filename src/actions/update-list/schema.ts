import { z } from "zod"

export const UpdateListSchema = z.object({
  title: z.string().optional(),
  boardId: z.string().optional(),
  position: z.number().optional(),
  listId: z.string().min(1),
})
