import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentNote, setNote } from '../features/currentNoteSlice'
import { useDeleteNoteMutation } from '../services/chenNote2API'
import { IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PendingNote from './PendingNote'
import { setNoteDetail } from '../features/noteDetailSlice'
import { type INote } from '../types/types'

interface Props {
  note: INote
}

const Note = ({ note }: Props) => {
  const selectedNote = useSelector(selectCurrentNote).note
  const selectedFolder = useSelector(selectCurrentNote).folder
  const [isHover, setIsHover] = useState(false)
  const [deleteNote] = useDeleteNoteMutation()
  const dispatch = useDispatch()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteNote = async () => {
    setIsDeleting(true)
    await deleteNote({ folderId: selectedFolder, noteId: note._id })
    if (selectedNote === note._id) {
      dispatch(setNote(''))
      dispatch(
        setNoteDetail({
          _id: '',
          title: '',
          content: '',
          folder: '',
          createdAt: ''
        })
      )
    }
  }

  if (isDeleting) return <PendingNote note={note} status="deleting" />

  return (
    <div
      onMouseEnter={() => { setIsHover(true) }}
      onMouseLeave={() => { setIsHover(false) }}
      onClick={() => {
        dispatch(setNote(note._id))
      }}
      style={{
        display: selectedFolder !== note.folder ? 'none' : 'block',
        backgroundColor: note._id === selectedNote ? '#D4391C' : undefined,
        color: note._id === selectedNote ? 'white' : undefined
      }}
      className="bg-white py-2 px-4 rounded-md mb-2 cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <Typography
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            lineClamp: 1,
            WebkitBoxOrient: 'vertical',
            fontWeight: 'bold',
            fontSize: {
              md: '16px',
              lg: '18px',
              xl: '20px'
            }
          }}
          className="font-bold"
        >
          {note.title}
        </Typography>
        {isHover && (
          <div className="flex">
            <IconButton>
              <EditIcon
                style={{
                  color: note._id === selectedNote ? 'white' : undefined,
                  fontSize: '18px'
                }}
              />
            </IconButton>
            <IconButton onClick={handleDeleteNote}>
              <DeleteIcon
                style={{
                  color: note._id === selectedNote ? 'white' : undefined,
                  fontSize: '18px'
                }}
              />
            </IconButton>
          </div>
        )}
      </div>
      <Typography
        sx={{
          fontSize: {
            md: '10px',
            lg: '12px',
            xl: '14px'
          }
        }}
      >
        {new Date(note.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true
        })}
      </Typography>
    </div>
  )
}

export default Note
