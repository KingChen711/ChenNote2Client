/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type INote } from '../types/types'

const initialState: INote = {
  title: '',
  content: '',
  _id: '',
  folder: '',
  createdAt: ''
}
export const noteDetailSlice = createSlice({
  name: 'noteDetail',
  initialState,
  reducers: {
    setNoteDetail: (state, action) => action.payload,
    setNoteContent: (state, action) => {
      state.content = action.payload
    }
  }
})

export const { setNoteDetail, setNoteContent } = noteDetailSlice.actions

export const selectNoteDetail = (state: RootState) => state.noteDetail

export default noteDetailSlice.reducer
