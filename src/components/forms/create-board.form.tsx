"use client"

import { createBoard } from "@/actions/create-board/index"

import { useAction } from "@/hooks/use-action"

export const CreateBoardForm = () => {
  const { data, error, execute, isLoading, statusCode, fieldErrors } =
    useAction(createBoard, {
      onSuccess(data) {
        console.log("Successfully created board", data)
      },
      onError(error) {
        console.log("Error creating board.", error)
      },
    })
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string
    console.log(title)
    execute({ title })
  }
  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <input
          title="title"
          name="title"
          placeholder="title..."
          required
          className="border border-primary p-1"
        />
        {/* {fieldErrors &&
          Object.keys(fieldErrors).map((key) => (
            <div key={key}>{fieldErrors[key]}</div>
          ))} */}
      </div>
    </form>
  )
}
