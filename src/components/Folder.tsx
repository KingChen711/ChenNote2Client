import React, { useState } from 'react'
import { IconButton, Typography } from '@mui/material'
import { useDeleteFolderMutation } from '../services/chenNote2API'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCurrentNote,
  setFolder,
  setNote
} from '../features/currentNoteSlice'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PendingFolder from './PendingFolder'
import { setNoteDetail } from '../features/noteDetailSlice'
import { type IFolder } from '../types/types'
import { createMessage } from '../features/noticeMessageSlice'

interface Props {
  folder: IFolder
}

const Folder = ({ folder }: Props) => {
  const dispatch = useDispatch()
  const selectedFolder = useSelector(selectCurrentNote).folder
  const [deleteFolder] = useDeleteFolderMutation()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isHover, setIsHover] = useState(false)

  const handleDeleteFolder = async () => {
    setIsDeleting(true)
    await deleteFolder({ folderId: folder._id })
      .then(() => {
        dispatch(createMessage({
          type: 'success',
          message: 'Xóa folder thành công'
        }))
      })
      .catch(() => {
        dispatch(createMessage({
          type: 'fail',
          message: 'Xóa folder thất bại'
        }))
      })
    if (selectedFolder === folder._id) {
      dispatch(setFolder(''))
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

  if (isDeleting) return <PendingFolder folder={folder} status="deleting" />

  return (
    <div
      onMouseEnter={() => {
        setIsHover(true)
      }}
      onMouseLeave={() => {
        setIsHover(false)
      }}
      onClick={() => dispatch(setFolder(folder._id))}
      style={{
        backgroundColor: folder._id === selectedFolder ? '#1150D4' : undefined,
        color: folder._id === selectedFolder ? 'white' : undefined
      }}
      className="bg-white font-bold py-2 px-4 rounded-md mb-2 cursor-pointer flex justify-between items-center"
    >
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
      >
        {folder.name}
      </Typography>
      {isHover && (
        <div className="flex">
          <IconButton>
            <EditIcon
              style={{
                color: folder._id === selectedFolder ? 'white' : undefined,
                fontSize: '18px'
              }}
            />
          </IconButton>
          <IconButton onClick={handleDeleteFolder}>
            <DeleteIcon
              style={{
                color: folder._id === selectedFolder ? 'white' : undefined,
                fontSize: '18px'
              }}
            />
          </IconButton>
        </div>
      )}
    </div>
  )
}

export default React.memo(Folder)
