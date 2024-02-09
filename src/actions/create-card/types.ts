import { Card, List } from "@prisma/client"
import { z } from "zod"

import { ActionState } from "@/lib/create-safe-action"

import { CreateCardSchema } from "./schema"

export type InputType = z.infer<typeof CreateCardSchema>
export type ReturnType = ActionState<InputType, Card>
