"use client"

import { useEffect } from "react"
import { createBoard } from "@/actions/create-board/index"
import { toast } from "sonner"

import { useAction } from "@/hooks/use-action"
import { useBoardForm } from "@/hooks/use-board-form"
import { useFieldErrors } from "@/hooks/use-field-errors"

import { FormInput } from "./form-input"
import { FormPicker } from "./form-picker"
import { FormSubmit } from "./form-submit"

export const CreateBoardForm = () => {
  const { resetFieldErrors } = useFieldErrors()
  const { actions, state: createFormData } = useBoardForm((state) => state)
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
  useEffect(() => {
    if (resetFieldErrors) setFieldErrors(undefined)
  }, [resetFieldErrors, setFieldErrors])
  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-4">
        <FormPicker id="image" errors={fieldErrors} />
        <FormInput
          value={createFormData.title}
          onChange={(value) => actions.setField({ title: value })}
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
