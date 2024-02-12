import { CardWithList } from "@/prisma/types"
import { z } from "zod"

import { ActionState } from "@/lib/create-safe-action"

import { CopyCardSchema } from "./schema"

export type InputType = z.infer<typeof CopyCardSchema>
export type ReturnType = ActionState<InputType, CardWithList>
