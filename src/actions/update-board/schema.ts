import { z } from "zod"

export const UpdateBoardSchem = z.object({
  title: z
    .string()
    .min(3, {
      message: "Minimum 3 characters required",
    })
    .optional(),
  id: z.string().min(1),
  image: z
    .object({
      imageId: z.string().min(1, { message: "Image is required" }),
      imageThumbUrl: z.string(),
      imageFullUrl: z.string(),
      imageHtmlLink: z.string(),
      imageUsername: z.string(),
    })
    .optional(),
  // Send the board to another organization
  orgId: z.string().min(1).optional(),
})
