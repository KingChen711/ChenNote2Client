import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { IconButton, Typography } from '@mui/material'
import { selectCurrentNote } from '../features/currentNoteSlice'
import { selectNoteDetail, setNoteContent } from '../features/noteDetailSlice'
import { useUpdateNoteMutation } from '../services/chenNote2API'
import 'react-quill/dist/quill.snow.css'
import TextEditor from './TextEditor'
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

const NoteDetail = () => {
  const dispatch = useDispatch()
  const noteDetail = useSelector(selectNoteDetail)
  const selectedNote = useSelector(selectCurrentNote).note
  const [prevContent, setPrevContent] = useState('')
  const [isEditMode, setIsEditMode] = useState(false)
  const [updatingNote, setUpdatingNote] = useState('')
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation()

  useEffect(() => {
    if (isUpdating) setUpdatingNote(selectedNote)
  }, [isUpdating])

  const handleSave = () => {
    setIsEditMode(false)
    if (noteDetail.content === prevContent) {
      return
    }
    updateNote({
      noteId: selectedNote,
      note: noteDetail
    })
      .then(() => { console.log('Cập nhật note thành công') })
      .catch(() => { console.log('Cập nhật note thất bại') })
  }

  return (
    <div
      style={{
        transform: selectedNote === '' ? 'translateX(-150%)' : 'none'
      }}
      className="col-span-6 bg-[#D42672] relative z-30 transition-transform duration-300 overflow-y-auto p-4 font-medium flex flex-col"
    >
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
          Note
        </Typography>
        {isEditMode
          ? (
          <div className="flex">
            <IconButton onClick={handleSave}>
              <SaveAsOutlinedIcon
                style={{
                  color: 'white',
                  fontSize: '32px'
                }}
              />
            </IconButton>
            <IconButton
              onClick={() => {
                dispatch(setNoteContent(prevContent))
                setPrevContent('')
                setIsEditMode(false)
              }}
            >
              <CancelOutlinedIcon
                style={{
                  color: 'white',
                  fontSize: '32px'
                }}
              />
            </IconButton>
          </div>
            )
          : (
          <IconButton
            onClick={() => {
              setPrevContent(noteDetail.content)
              setIsEditMode(true)
            }}
          >
            <EditOutlinedIcon
              style={{
                color: 'white',
                fontSize: '32px'
              }}
            />
          </IconButton>
            )}
      </div>
      <div className="flex-1 bg-white rounded-md p-4 overflow-y-auto relative">
        {isEditMode
          ? (
          <TextEditor />
            )
          : (
          <div dangerouslySetInnerHTML={{ __html: `${noteDetail.content}` }} />
            )}
        {updatingNote === selectedNote && isUpdating && (
          <div className="absolute w-full h-full top-0 left-0 bg-black text-white opacity-70 flex justify-center items-center text-3xl text-center px-4">
            Đang lưu thay đổi...
          </div>
        )}
      </div>
    </div>
  )
}

export default NoteDetail
