import { z } from "zod"

export const UpdateCardPositionSchema = z.object({
  boardId: z
    .string({
      required_error: "Board Id is required",
      invalid_type_error: "Board Id is required",
    })
    .min(1),
  items: z.array(
    z.object({
      id: z.string().min(1),
      title: z.string(),
      position: z.number(),
      listId: z.string().min(1),
      createdAt: z.date(),
      updatedAt: z.date(),
    })
  ),
})
