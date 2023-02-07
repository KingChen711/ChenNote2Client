import { useDispatch } from 'react-redux'
import { type INotice } from '../types/types'
import { v4 as uuidv4 } from 'uuid'
import { addMessage, removeMessage } from '../features/noticeMessageSlice'

const useCreateNotice = () => {
  const dispatch = useDispatch()
  const createNotice = ({ type, message }: Omit<INotice, 'id'>) => {
    const newNotice = {
      id: uuidv4(),
      type,
      message
    }
    dispatch(addMessage(newNotice))
    setTimeout(() => {
      dispatch(removeMessage(newNotice.id))
    }, 3000)
  }

  return {
    createNotice
  }
}

export default useCreateNotice
