import { z } from "zod"

export const CopyListSchema = z.object({
  id: z.string().min(1),
  boardId: z.string().min(1),
})
