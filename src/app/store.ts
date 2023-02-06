import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import currentNoteReducer from '../features/currentNote';
import userReducer from '../features/userSlice';
import { chenShareAPI } from '../services/chenNote2API';
import noteDetailReducer from '../features/noteDetailSlice';

export const store = configureStore({
  reducer: {
    currentNote: currentNoteReducer,
    user: userReducer,
    noteDetail: noteDetailReducer,
    [chenShareAPI.reducerPath]: chenShareAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chenShareAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
