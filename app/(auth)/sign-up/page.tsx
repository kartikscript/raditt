import SignUp from '@/components/SignUp'
import Link from 'next/link'
import React, { FC } from 'react'

const page:FC = () => {
  return (
    <div>      
      <Link href='/' className='text-lg rounded-lg flex items-center p-1 mx-2 my-4 font-semibold text-violet-400 '><img src='/arrow.svg' alt='arrow left'/>Home</Link>
      <SignUp/>
    </div>
  )
}

export default page