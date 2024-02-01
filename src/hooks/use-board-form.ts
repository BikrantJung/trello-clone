import { create } from "zustand"

type State = {
  title: string
  image: Partial<ImageType>
}
// This data is saved to database for actual cover image of the board.
type ImageType = {
  id: string
  thumbUrl: string
  fullUrl: string
  htmlLink: string
  userName: string
}
type Actions = {
  setField: (obj: Partial<State>) => void
}
export const initialBoardFormValues: State = {
  title: "",
  image: {
    fullUrl: "",
    htmlLink: "",
    id: "",
    thumbUrl: "",
    userName: "",
  },
}
type StateActions = {
  state: State
  actions: Actions
}
export const useBoardForm = create<StateActions>((set) => ({
  state: initialBoardFormValues,
  actions: {
    setField: (newState) =>
      set((prevState) => ({
        state: {
          ...prevState.state,
          image: {
            ...prevState.state.image,
            ...newState.image,
          },
          ...newState,
        },
      })),
  },
}))
