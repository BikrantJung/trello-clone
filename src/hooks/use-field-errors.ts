import { create } from "zustand"

type FieldErrorsStore = {
  resetFieldErrors: boolean
  setResetFieldErrors: (reset: boolean) => void
}
export const useFieldErrors = create<FieldErrorsStore>((set) => ({
  resetFieldErrors: false,
  setResetFieldErrors: (reset) => set({ resetFieldErrors: reset }),
}))
