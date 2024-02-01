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
  image: z.object(
    {
      imageId: z.string().min(1, { message: "Image is required" }),
      imageThumbUrl: z.string(),
      imageFullUrl: z.string(),
      imageHtmlLink: z.string(),
      imageUsername: z.string(),
    },
    { required_error: "Image is required" }
  ),
})
