import { useCallback, useState } from "react"

import { ActionState, FieldErrors } from "@/lib/create-safe-action"

export type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void
  onError?: (error: string) => void
  onComplete?: () => void
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) => {
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined)
  const [errors, setErrors] = useState<string | undefined>(undefined)
  const [data, setData] = useState<TOutput | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [statusCode, setStatusCode] = useState<number | undefined>(undefined)

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true)
      try {
        const result = await action(input)
        if (!result) {
          return
        }
        const { data, error, fieldErrors, statusCode } = result

        if (fieldErrors) setFieldErrors(fieldErrors)
        if (error) {
          setErrors(error)
          // Callback to onError function
          options.onError?.(error)
        }
        if (data) {
          setData(data)
          // Callback to onSuccess function
          options.onSuccess?.(data)
        }
        if (statusCode) setStatusCode(statusCode)
      } catch (error) {
        //
      } finally {
        setIsLoading(false)
        options.onComplete?.()
      }
    },
    [action, options]
  )

  return {
    errors,
    data,
    statusCode,
    isLoading,
    execute,
  }
}
