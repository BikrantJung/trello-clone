"use client"

import { createBoard } from "@/actions/create-board/index"

import { useAction } from "@/hooks/use-action"

import { FormErrors } from "./form-errors"
import { FormInput } from "./form-input"

export const CreateBoardForm = () => {
  const { execute, fieldErrors } = useAction(createBoard)
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string
    console.log(title)
    execute({ title })
  }
  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput id="title" type="text" />
        <FormErrors id="title" errors={fieldErrors} />
      </div>
    </form>
  )
}
