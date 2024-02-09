import { z } from "zod"

export const DeleteListSchema = z.object({
  id: z.string().min(1),
  boardId: z.string().min(1),
})
