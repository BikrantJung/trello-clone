import { z } from "zod"

export const CreateBoardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Minimum 3 characters required",
    }),
})
