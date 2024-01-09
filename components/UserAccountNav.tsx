'use client'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import React, { FC, useState } from 'react'
import UserAvatar from './UserAvatar'

interface UserAccountNavProps{
  user:Pick<User,'name'|'image'|'email'>
}


const UserAccountNav:FC<UserAccountNavProps> = ({user}) => {

  const [modal,setModal]=useState(false)

  function handleModal(){
    setModal(prev=>!prev)
  }
  return (<>
    <div onClick={()=>handleModal()} className='relative cursor-pointer '>
     <UserAvatar user={user}/>
    </div>

    {
      modal&&(
        <>
        <div className={`absolute right-5 top-12  transition-all ease-in duration-300 rounded-md shadow-lg min-w-56 py-4 px-2 bg-white text-sm text-gray-500 flex flex-col gap-1 z-50`}>
           <div className='px-2' >
             {user.name&& <p className='font-medium text-gray-900'>{user.name}</p>}
             {user.email&& <p className='font-medium text-gray-400'>{user.email}</p>}
           </div>
           <Link className='hover:bg-gray-200 hover:text-gray-700 p-2 transition-all font-semibold rounded-lg' href='/'>Feed</Link>
           <Link className='hover:bg-gray-200 hover:text-gray-700 p-2 transition-all font-semibold rounded-lg' href='/'>Create Community</Link>
           <Link className='hover:bg-gray-200 hover:text-gray-700 p-2 transition-all font-semibold rounded-lg' href='/'>Settings</Link>
           <button onClick={()=>signOut({callbackUrl:`${window.location.origin}/sign-in`})} className='mt-2 text-start hover:bg-red-200 hover:text-gray-800 px-2 py-1 transition-all font-bold rounded-lg' >Sign out</button>
        </div>
        <div onClick={()=>handleModal()} className=' fixed top-0 left-0 w-full h-full opacity-10 z-40'></div>
        </>
      )
    }
    
    </>
  )
}

export default UserAccountNav