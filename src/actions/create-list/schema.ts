import { z } from "zod"

export const CreateListSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title is required",
  }),
  boardId: z
    .string({
      required_error: "Board Id is required",
      invalid_type_error: "Board Id is required",
    })
    .min(1),
})
