import { List } from "@prisma/client"
import { z } from "zod"

import { ActionState } from "@/lib/create-safe-action"

import { UpdateListPositionSchema } from "./schema"

export type InputType = z.infer<typeof UpdateListPositionSchema>
export type ReturnType = ActionState<InputType, List[]>
