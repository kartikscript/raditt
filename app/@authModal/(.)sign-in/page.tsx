'use client'
import SignIn from '@/components/SignIn'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const router=useRouter()
  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/6 bg-black/90 px-6 pt-4 pb-8 rounded-xl shadow-xl'>
      <img onClick={()=>router.back()} src='/x.svg' alt='close button' className='block cursor-pointer ml-auto'/>
      <SignIn/>
    </div>
  )
}

export default page