import { z } from "zod"

export const UpdateCardSchema = z.object({
  title: z.string(),
  id: z.string().min(1),
  boardId: z.string().min(1),
  description: z.string().nullable(),
})
