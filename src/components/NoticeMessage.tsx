import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import { type INotice } from '../types/types'

const NoticeMessage = ({ message, type }: Omit<INotice, 'id'>) => {
  return (
    <div
      style={{
        borderColor: type === 'success' ? '#4BB543' : '#fc100d'
      }}
      className="absolute right-0 top-4 bg-white border-l-8 p-4 w-96 rounded-sm flex justify-between items-center animate-fadeout"
    >
      <div className="text-lg font-bold">{message}</div>
      {type === 'success'
        ? (
        <CheckCircleIcon style={{ color: '#4BB543', fontSize: '32px' }} />
          )
        : (
        <ErrorIcon style={{ color: '#fc100d', fontSize: '32px' }} />
          )}
    </div>
  )
}

export default NoticeMessage
