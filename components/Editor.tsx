'use client'
import TextareaAutosize from 'react-textarea-autosize'

const Editor = () => {
  return (
    <div>
      
      <TextareaAutosize
      placeholder='Title'
      className='text-2xl text-violet-200 font-semibold bg-gray-800 p-4 w-4/5'
      />
    </div>
  )
}

export default Editor