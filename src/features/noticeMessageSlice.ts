/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'
import { type INotice } from '../types/types'

const initialState: INotice = {
  type: undefined,
  message: '',
  display: false
}
export const noticeMessageSlice = createSlice({
  name: 'noticeMessage',
  initialState,
  reducers: {
    createMessage: (state, action) => {
      state.type = action.payload.type
      state.message = action.payload.message
      state.display = true
    },
    unmountMessage: (state) => { state.display = false }
  }
})

export const { createMessage, unmountMessage } = noticeMessageSlice.actions

export const selectNoticeMessage = (state: RootState) => state.noticeMessage

export default noticeMessageSlice.reducer
