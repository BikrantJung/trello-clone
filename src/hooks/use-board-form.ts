import { create } from "zustand"

type State = {
  title: string
  imageId: string
}
type Actions = {
  setField: (obj: Partial<State>) => void
}
const initialValue: State = {
  title: "",
  imageId: "",
}
type StateActions = {
  state: State
  actions: Actions
}
export const useBoardForm = create<StateActions>((set) => ({
  state: initialValue,
  actions: {
    setField: (newState) =>
      set((prevState) => ({
        state: {
          ...prevState.state,
          ...newState,
        },
      })),
  },
}))
