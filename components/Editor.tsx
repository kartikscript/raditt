'use client'
import TextareaAutosize from 'react-textarea-autosize'
import {useForm} from 'react-hook-form'


const Editor = () => {

  const {}=useForm<>()
  return (
    <div>
      
      <TextareaAutosize
      placeholder='Title'
      className='text-4xl text-violet-200 font-semibold bg-gray-700 p-2 w-3/5 rounded-lg'
      />
    </div>
  )
}

export default Editor