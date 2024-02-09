import { z } from "zod"

export const CreateCardSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required",
  }),
  listId: z
    .string({
      required_error: "Board Id is required",
      invalid_type_error: "Board Id is required",
    })
    .min(1),
  boardId: z
    .string({
      required_error: "Board Id is required",
      invalid_type_error: "Board Id is required",
    })
    .min(1),
})
