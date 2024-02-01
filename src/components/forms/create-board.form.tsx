"use client"

import { createBoard } from "@/actions/create-board/index"
import { toast } from "sonner"

import { useAction } from "@/hooks/use-action"

import { FormInput } from "./form-input"
import { FormSubmit } from "./form-submit"

export const CreateBoardForm = () => {
  const { execute, fieldErrors, setFieldErrors } = useAction(createBoard, {
    onSuccess() {
      toast.success("Board created!")
    },
    onError(error) {
      toast.error(error)
    },
  })
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string
    execute({ title })
  }
  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-4">
        <FormInput
          id="title"
          label="Board title"
          type="text"
          errors={fieldErrors}
        />
      </div>
      <FormSubmit className="w-full">Create</FormSubmit>
    </form>
  )
}
