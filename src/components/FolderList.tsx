import React, { useState, useEffect } from 'react'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import {
  Button,
  IconButton,
  Modal,
  TextField,
  Typography
} from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import {
  useAddFolderMutation,
  useGetFoldersQuery
} from '../services/chenNote2API'
import PendingFolder from './PendingFolder'
import Folder from './Folder'
import { type IFolder } from '../types/types'

const FolderList = () => {
  const { data: folders, isLoading } = useGetFoldersQuery(undefined)
  console.log(folders)
  const [addFolder] = useAddFolderMutation()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [pendingFolders, setPendingFolders] = useState<IFolder[]>()

  useEffect(() => {
    setPendingFolders([])
  }, [folders])

  const handleAddFolder = (
    e:
    | React.FormEvent<HTMLFormElement>
    | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (folderName === '') return

    const pendingFolder: IFolder = {
      _id: uuidv4(),
      name: folderName,
      notes: []
    }

    setPendingFolders((prev) => [...(prev ?? []), pendingFolder] as IFolder[])

    setFolderName('')
    setIsOpenModal(false)
    addFolder({ name: folderName })
      .then(() => {
        console.log('Thêm folder mới thành công!')
      })
      .catch(() => {
        console.log('Thêm folder mới thất bại!')
      })
  }

  return (
    <div className="notesOrFoldersContainer bg-[#D49B1C] relative z-50">
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
          onSubmit={handleAddFolder}
          className="bg-white rounded-lg p-6 max-w-[90%] w-[500px]"
        >
          <div className="text-2xl font-bold mb-4">New Folder</div>
          <TextField
            style={{ marginBottom: '16px' }}
            className="w-full"
            id="standard-basic"
            label="Folder's Name"
            variant="standard"
            value={folderName}
            onChange={(e) => {
              setFolderName(e.target.value)
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
            <Button onClick={handleAddFolder} variant="contained">
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
          Folders
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
        {folders?.map((folder: IFolder) => {
          return <Folder key={folder._id} folder={folder} />
        })}
        {pendingFolders?.map((folder: IFolder) => {
          return (
            <PendingFolder key={folder._id} status="creating" folder={folder} />
          )
        })}
        {isLoading && (
          <>
            <PendingFolder status="skeleton" />
            <PendingFolder status="skeleton" />
            <PendingFolder status="skeleton" />
            <PendingFolder status="skeleton" />
            <PendingFolder status="skeleton" />
          </>
        )}
      </div>
    </div>
  )
}

export default FolderList
