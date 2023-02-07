import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { URL_API } from '../utils/constants'
import { type IFolder, type INote, type IUser } from '../types/types'

const baseUrl = `${URL_API}/api/`

export const chenShareAPI = createApi({
  reducerPath: 'chenNote2Api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Folders', 'Notes'],
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body
      })
    }),
    getUserBasic: builder.query<IUser, undefined>({
      query: () => ({
        url: '/auth/user',
        headers: {
          authorization: `Bearer ${
            localStorage.getItem('chen-note-2-token') ?? ''
          }`
        }
      })
    }),
    getFolders: builder.query<IFolder[], undefined>({
      query: () => ({
        url: '/folders',
        headers: {
          authorization: `Bearer ${
            localStorage.getItem('chen-note-2-token') ?? ''
          }`
        }
      }),
      providesTags: ['Folders']
    }),
    addFolder: builder.mutation<IFolder, { name: string }>({
      query: (body) => ({
        url: '/folders',
        method: 'POST',
        body,
        headers: {
          authorization: `Bearer ${
            localStorage.getItem('chen-note-2-token') ?? ''
          }`
        }
      }),
      invalidatesTags: ['Folders']
    }),
    deleteFolder: builder.mutation<IFolder, { folderId: string }>({
      query: (body) => ({
        url: '/folders',
        method: 'DELETE',
        body,
        headers: {
          authorization: `Bearer ${
            localStorage.getItem('chen-note-2-token') ?? ''
          }`
        }
      }),
      invalidatesTags: ['Folders']
    }),
    getNotes: builder.query<INote[], string>({
      query: (folderId) => ({
        url: `/notes/${folderId}`,
        headers: {
          authorization: `Bearer ${
            localStorage.getItem('chen-note-2-token') ?? ''
          }`
        }
      }),
      providesTags: ['Notes']
    }),
    addNote: builder.mutation<
    INote,
    { folderId: string, title: string, createdAt: Date }
    >({
      query: (body) => ({
        url: '/notes',
        method: 'POST',
        body,
        headers: {
          authorization: `Bearer ${
            localStorage.getItem('chen-note-2-token') ?? ''
          }`
        }
      }),
      invalidatesTags: ['Notes']
    }),
    deleteNote: builder.mutation<INote, { folderId: string, noteId: string }>({
      query: (body) => ({
        url: '/notes',
        method: 'DELETE',
        body,
        headers: {
          authorization: `Bearer ${
            localStorage.getItem('chen-note-2-token') ?? ''
          }`
        }
      }),
      invalidatesTags: ['Notes']
    }),
    updateNote: builder.mutation<INote, { note: INote, noteId: string }>({
      query: (body) => ({
        url: '/notes/',
        method: 'PUT',
        body,
        headers: {
          authorization: `Bearer ${
            localStorage.getItem('chen-note-2-token') ?? ''
          }`
        }
      }),
      invalidatesTags: ['Notes']
    })
  })
})

export const {
  useLoginUserMutation,
  useGetUserBasicQuery,
  useGetFoldersQuery,
  useAddFolderMutation,
  useDeleteFolderMutation,
  useGetNotesQuery,
  useAddNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation
} = chenShareAPI
