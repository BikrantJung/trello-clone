import { z } from "zod"

export const DeleteCardSchema = z.object({
  id: z.string().min(1),
  boardId: z.string().min(1),
})
