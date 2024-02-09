import { Board } from "@prisma/client"
import { z } from "zod"

import { ActionState } from "@/lib/create-safe-action"

import { UpdateBoardSchem } from "./schema"

export type InputType = z.infer<typeof UpdateBoardSchem>
export type ReturnType = ActionState<InputType, Board>
