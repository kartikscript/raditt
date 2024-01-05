'use client'
import React, { useState } from 'react'
import {useMutation} from '@tanstack/react-query'
// import axios from 'axios'
const page = () => {

  const [input,setInput]= useState('')

  // const{}=useMutation({
  //   mutationFn:async ()=>{
  //       await axios
  //   }
  // })

  return (
    <div className='bg-violet-100  min-h-screen flex justify-center items-start'>
    <div className='w-9/12 rounded-lg shadow-xl  my-12 p-4 bg-violet-400'>
        <h1 className='text-[2.5rem] font-extrabold text-gray-900 pt-6 pb-10'>Create a Community</h1>
        <hr className='bg-gray-700 h-px'/>
        <p className='font-bold text-3xl text-gray-800 pt-8'>Name</p>
        <p className='text-md font-medium text-gray-600 pt-2'>Community names including capitalization cannot be changed</p>
        <div>
          <div className='relative mt-4'>
        <input 
        placeholder='Create Community'
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        className=' pl-6 text-lg font-medium p-1 rounded-md  text-gray-700  '
        />
        <p className='absolute left-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-gray-500 '>r/</p>
        </div>
        </div>
    </div>
    </div>
  )
}

export default page