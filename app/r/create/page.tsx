'use client'
import React, { useState } from 'react'
import {useMutation} from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { CreateSubredditPayload } from '@/lib/validators/subreddit'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
const page = () => {

  const [input,setInput]= useState('')
  const [isLoading,setIsLoading]=useState(false)
  const router=useRouter()

  const{mutate:createCommunity,}=useMutation({
    mutationFn:async ()=>{
      setIsLoading(true)
      const payload:CreateSubredditPayload={
        name:input
      }
      const {data}= await axios.post('/api/subreddit',payload)
      return data as string
    },
    onError:(err)=>{
      setIsLoading(false)
      if(err instanceof AxiosError){
        if(err.response?.status===409){
          return toast.error('Subreddit already exists !',{position:'top-center'})
        } 
        if(err.response?.status===422){
          return toast.error('Name must have atleast 3 characters !',{position:'top-center'})
        }
        if(err.response?.status===401){
          return toast.error('You must be logged in to Create Community !',{position:'top-center'})
        }
      }
      return toast.error('An Error Occured :Could not create Subreddit !',{position:'top-center'})

    },
    onSuccess:(data)=>{
      setIsLoading(false)
      router.push(`/r/${data}`)
    }
  })

  
  return (
    <div className='bg-violet-100  min-h-screen flex justify-center items-start'>
    <div className='w-9/12 rounded-lg shadow-xl  my-12 p-4 bg-violet-400'>
        <h1 className='text-[2.5rem] font-extrabold text-black/90 pt-6 pb-10'>Create a Community</h1>
        <hr className='bg-gray-700 h-px'/>
        <p className='font-bold text-3xl text-gray-900 pt-8'>Name</p>
        <p className='text-md font-medium text-gray-700 pt-2'>Community names including capitalization cannot be changed</p>
        
          <div className='relative mt-4'>
        <input 
        placeholder='Community Name'
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        className=' pl-6 text-lg font-medium p-1 rounded-md  text-gray-700  '
        />
        <p className='absolute left-0 top-1/2 translate-x-1/2 -translate-y-1/2 text-lg font-semibold text-gray-400 '>r/</p>
        </div>
        <div className=' mt-8 flex gap-6'>
          <button onClick={()=>router.back()} className='p-3 rounded-md font-semibold text-white/70 bg-gray-800 hover:bg-gray-900 hover:text-white/90'>Cancel</button>
          <button onClick={()=>createCommunity()} disabled={input.length===0} className='flex items-center gap-2 p-3 disabled:bg-gray-700  rounded-md font-semibold bg-gray-900 text-lg text-white/80 focus:ring-4 focus:ring-violet-500 hover:text-white focus:bg-gray-950'>
            {isLoading && <img src='/loaderr.svg' alt='loader' className='w-8 h-8'/>}
            Create Community
          </button>
        </div>
    </div>
    </div>
  )
}

export default page