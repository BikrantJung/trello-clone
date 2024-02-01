"use client"

import { useEffect } from "react"
import { createBoard } from "@/actions/create-board/index"
import { toast } from "sonner"

import { useAction } from "@/hooks/use-action"
import { useFieldErrors } from "@/hooks/use-field-errors"

import { FormInput } from "./form-input"
import { FormSubmit } from "./form-submit"

export const CreateBoardForm = () => {
  const { resetFieldErrors } = useFieldErrors()
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
