import { ListWithCards } from "@/prisma/types"
import { z } from "zod"

import { ActionState } from "@/lib/create-safe-action"

import { CopyListSchema } from "./schema"

export type InputType = z.infer<typeof CopyListSchema>
export type ReturnType = ActionState<InputType, ListWithCards>
