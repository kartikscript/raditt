import { getAuthSession } from '@/lib/auth'
import Link from 'next/link'
import React from 'react'
import UserAccountNav from './UserAccountNav'

const Navbar = async() => {

  const session=await getAuthSession()
 
  return (
    <nav className='flex justify-between items-center px-8 py-2  bg-gradient-to-r from-violet-700  to-violet-400'>
         <img className='w-10 h-10' src='/redditlogo.svg'/>
        {
          session?.user?(
           <UserAccountNav user={session.user}/>
          ):(
        <Link href='/sign-in' className='p-2 bg-violet-400 text-base rounded-lg text-gray-700'>sign-in</Link>
          )
        }

    </nav>
  )
}

export default Navbar