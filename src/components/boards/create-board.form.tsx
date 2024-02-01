"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBoard } from "@/actions/create-board/index"
import { toast } from "sonner"

import { useAction } from "@/hooks/use-action"
import { initialBoardFormValues, useBoardForm } from "@/hooks/use-board-form"
import { useFieldErrors } from "@/hooks/use-field-errors"
import { useFormPopover } from "@/hooks/use-form-popover"

import { FormInput } from "../forms/form-input"
import { FormSubmit } from "../forms/form-submit"
import { BoardImagePicker } from "./board-image-picker"

export const CreateBoardForm = () => {
  const { resetFieldErrors } = useFieldErrors()
  const { actions, state: createFormData } = useBoardForm((state) => state)
  const { setIsOpen } = useFormPopover()
  const router = useRouter()
  const { execute, fieldErrors, setFieldErrors } = useAction(createBoard, {
    onSuccess(data) {
      toast.success("Board created!")
      // Reset board form data
      actions.setField(initialBoardFormValues)
      setIsOpen(false)
      router.push(`board/${data.id}`)
    },
    onError(error) {
      toast.error(error)
    },
  })
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string
    const { fullUrl, htmlLink, id, thumbUrl, userName } = createFormData.image
    execute({
      title,
      image: {
        imageFullUrl: fullUrl || "",
        imageHtmlLink: htmlLink || "",
        imageId: id || "",
        imageThumbUrl: thumbUrl || "",
        imageUsername: userName || "",
      },
    })
  }
  useEffect(() => {
    if (resetFieldErrors) setFieldErrors(undefined)
  }, [resetFieldErrors, setFieldErrors])
  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-4">
        <BoardImagePicker id="image" errors={fieldErrors} />
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
