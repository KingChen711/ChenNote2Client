/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type INotice } from '../types/types'

const initialState: INotice[] = []
export const noticeMessageSlice = createSlice({
  name: 'noticeMessage',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      return [...state]
    },

    removeMessage: (state, action) => {
      return state.filter((i) => i.id !== action.payload)
    }
  }
})

export const { addMessage, removeMessage } = noticeMessageSlice.actions

export const selectNoticeMessage = (state: RootState) => state.noticeMessage

export default noticeMessageSlice.reducer
