/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { type RootState } from '../app/store'

const initialState = {
  email: '',
  name: '',
  avatarUrl: ''
}
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload
  }
})

export const { setUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
