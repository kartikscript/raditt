'use client'
import { signIn } from 'next-auth/react'
import React, { FC, useState } from 'react'
import { toast } from 'react-toastify'

const UserAuthForm:FC = () => {
  const [isLoading, setIsLoading]=useState<boolean>(false)

  async function signinGoogle() {
    setIsLoading(true)
    try {
      await signIn('google')
    } catch (error) {
      toast.error('Error in Signing-in',{position:'bottom-right'})
    } finally{
      setIsLoading(false)
    }
  }
  return (
    <div className='w-1/2 '>
      <button onClick={()=>signinGoogle()} className='w-full bg-gray-900 p-2 rounded-3xl  transition-all flex justify-center items-center text-2xl font-medium gap-2 hover:bg-gray-950 focus:bg-gray-950 '>{
        isLoading?(
          <img src='/loaderr.svg' alt='loader' className='w-[36px]'  />
        ):(
          <img src='/google.svg' alt='google logo' className='w-[36px]'/>
        )
      } Google</button>
    </div>
  )
}

export default UserAuthForm