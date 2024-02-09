"use client"

import { useEffect } from "react"
import { updateBoard } from "@/actions/update-board"
import { Board } from "@prisma/client"
import { toast } from "sonner"

import { useAction } from "@/hooks/use-action"
import {
  ImageType,
  initialBoardFormValues,
  useUpdateBoardForm,
} from "@/hooks/use-board-form"
import { useFieldErrors } from "@/hooks/use-field-errors"
import { useFormPopover } from "@/hooks/use-form-popover"
import { BoardImagePicker } from "@/components/boards/board-image-picker"
import { FormInput } from "@/components/forms/form-input"
import { FormSubmit } from "@/components/forms/form-submit"

interface UpdateBoardFormProps {
  board: Board
}
export const UpdateBoardForm = ({ board }: UpdateBoardFormProps) => {
  const { resetFieldErrors } = useFieldErrors()
  const { actions, state: updateBoardData } = useUpdateBoardForm(
    (state) => state
  )
  const { setIsOpen } = useFormPopover()
  const { execute, fieldErrors, setFieldErrors } = useAction(updateBoard, {
    onSuccess() {
      toast.success("Board updated!")
      // Reset board form data
      actions.setField(initialBoardFormValues)
      setIsOpen(false)
    },
    onError(error) {
      toast.error(error)
    },
  })
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string
    execute({
      title: title || board.title,
      image: {
        imageFullUrl: updateBoardData.image.fullUrl || board.imageFullUrl,
        imageHtmlLink: updateBoardData.image.htmlLink || board.imageHtmlLink,
        imageId: updateBoardData.image.id || board.imageId,
        imageThumbUrl: updateBoardData.image.thumbUrl || board.imageThumbUrl,
        imageUsername: updateBoardData.image.userName || board.imageUsername,
      },
      id: board.id,
    })
  }
  useEffect(() => {
    if (resetFieldErrors) setFieldErrors(undefined)
  }, [resetFieldErrors, setFieldErrors])
  function handleImageSelection(image: ImageType) {
    actions.setField({ image })
  }
  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-4">
        <BoardImagePicker
          resetImageSelection={() => actions.setField({ image: undefined })}
          stateImage={updateBoardData.image}
          onImageSelection={handleImageSelection}
          id="image"
          errors={fieldErrors}
        />
        <FormInput
          value={updateBoardData.title || board.title}
          onChange={(value) => actions.setField({ title: value })}
          id="title"
          label="Board title"
          type="text"
          errors={fieldErrors}
        />
        {/* ===Organization Selection=== */}
      </div>
      <FormSubmit className="w-full">Update</FormSubmit>
    </form>
  )
}
