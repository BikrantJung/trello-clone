"use client"

import { CreateBoardStateType } from "@/actions/actions.types"
import { createBoard } from "@/actions/create-board"
import { useFormState } from "react-dom"

export const CreateBoardForm = () => {
  const initialState: CreateBoardStateType = { message: null, errors: {} }
  const [state, dispatch] = useFormState(createBoard, initialState)

  return (
    <form action={dispatch}>
      <div className="flex flex-col space-y-2">
        <input
          title="title"
          name="title"
          placeholder="title..."
          required
          className="border border-primary p-1"
        />
        {state?.errors?.title ? (
          <div>
            {state.errors.title.map((error) => (
              <p key={error} className="text-sm text-destructive">
                {error}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </form>
  )
}
