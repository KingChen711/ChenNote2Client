import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

const initialState = {
  folder: '',
  note: ''
}
export const currentNoteSlice = createSlice({
  name: 'currentNote',
  initialState,
  reducers: {
    setFolder: (state, action) => {
      state.folder = action.payload
    },
    setNote: (state, action) => {
      state.note = action.payload
    }
  }
})

export const { setNote, setFolder } = currentNoteSlice.actions

export const selectCurrentNote = (state: RootState) => state.currentNote

export default currentNoteSlice.reducer
