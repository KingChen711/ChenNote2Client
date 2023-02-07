import {
  Button,
  IconButton,
  Modal,
  TextField,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { selectCurrentNote } from '../features/currentNoteSlice'

import { useAddNoteMutation, useGetNotesQuery } from '../services/chenNote2API'
import Note from './Note'
import PendingNote from './PendingNote'
import { setNoteDetail } from '../features/noteDetailSlice'
import { type INote } from '../types/types'

const NoteList = () => {
  const dispatch = useDispatch()
  const selectedFolder = useSelector(selectCurrentNote).folder
  const selectedNote = useSelector(selectCurrentNote).note
  const { data: notes, isFetching } = useGetNotesQuery(selectedFolder)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [title, setTitle] = useState('')
  const [pendingNotes, setPendingNotes] = useState<INote[]>()
  const [addNote] = useAddNoteMutation()
  const [isFetchingNotesOfAnotherFolder, setIsFetchingAnotherNotes] =
    useState(false)

  useEffect(() => {
    setPendingNotes([])
  }, [notes])

  useEffect(() => {
    if (selectedNote !== '') {
      dispatch(setNoteDetail(notes?.find((note) => note._id === selectedNote)))
    }
  }, [selectedNote])

  useEffect(() => {
    setIsFetchingAnotherNotes(true)
    if (!isFetching) setIsFetchingAnotherNotes(false)
  }, [selectedFolder, notes])

  const handleAddNote = (
    e:
    | React.FormEvent<HTMLFormElement>
    | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (title === '') return
    setTitle('')
    setIsOpenModal(false)

    const now = new Date()

    const pendingNote: INote = {
      _id: uuidv4(),
      title,
      content: '',
      folder: selectedFolder,
      createdAt: now.toISOString()
    }

    setPendingNotes((prev) => [...(prev ?? []), pendingNote] as INote[])

    addNote({ folderId: selectedFolder, title, createdAt: now })
      .then(() => {
        console.log('Tạo note thành công')
      })
      .catch(() => {
        console.log('Tạo note thất bại')
      })
  }

  return (
    <div
      style={{
        transform: selectedFolder === '' ? 'translateX(-100%)' : 'none'
      }}
      className="notesOrFoldersContainer bg-[#11D485] relative z-40 transition-transform"
    >
      <Modal
        closeAfterTransition
        open={isOpenModal}
        onClose={() => {
          setIsOpenModal(false)
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <form
          onSubmit={handleAddNote}
          className="bg-white rounded-lg p-6 max-w-[90%] w-[500px]"
        >
          <div className="text-2xl font-bold mb-4">New Note</div>
          <TextField
            style={{ marginBottom: '16px' }}
            className="w-full my-4"
            id="standard-basic"
            label="Note's Title"
            variant="standard"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
          <div className="flex justify-end mt-4">
            <Button
              onClick={() => {
                setIsOpenModal(false)
              }}
              variant="outlined"
              style={{ marginRight: '8px' }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddNote} variant="contained">
              OK
            </Button>
          </div>
        </form>
      </Modal>
      <div className="flex justify-between items-center mb-4 px-1">
        <Typography
          sx={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: {
              md: '20px',
              lg: '22px',
              xl: '24px'
            }
          }}
        >
          Notes
        </Typography>
        <IconButton
          onClick={() => {
            setIsOpenModal(true)
          }}
        >
          <CreateNewFolderOutlinedIcon
            style={{
              color: 'white',
              fontSize: '32px'
            }}
          />
        </IconButton>
      </div>
      <div className="overflow-y-auto">
        {notes?.map((note) => {
          return <Note key={note._id} note={note} />
        })}
        {pendingNotes?.map((note) => {
          return <PendingNote key={note._id} status="creating" note={note} />
        })}
        {isFetchingNotesOfAnotherFolder && (
          <>
            <PendingNote status="skeleton" />
            <PendingNote status="skeleton" />
            <PendingNote status="skeleton" />
            <PendingNote status="skeleton" />
            <PendingNote status="skeleton" />
          </>
        )}
      </div>
    </div>
  )
}

export default NoteList
