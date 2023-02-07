import React, { useEffect } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ErrorIcon from '@mui/icons-material/Error'
import { useDispatch, useSelector } from 'react-redux'
import { selectNoticeMessage, unmountMessage } from '../features/noticeMessageSlice'

const NoticeMessage = () => {
  const { message, type } = useSelector(selectNoticeMessage)
  const dispatch = useDispatch()

  useEffect(() => {
    const timeOut = setTimeout(() => {
      console.log('timeout')

      dispatch(unmountMessage())
    }, 3000)

    return () => {
      clearTimeout(timeOut)
    }
  }, [])

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
