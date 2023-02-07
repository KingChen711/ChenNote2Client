import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectNoteDetail, setNoteContent } from '../features/noteDetailSlice'

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image'],
    ['clean']
  ]
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image'
]

const TextEditor = () => {
  const content = useSelector(selectNoteDetail).content
  const dispatch = useDispatch()

  const handleChange = (value: string) => {
    dispatch(setNoteContent(value))
  }

  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      value={content}
      onChange={handleChange}
    />
  )
}

export default TextEditor
