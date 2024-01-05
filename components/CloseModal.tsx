'use client'

import { useRouter } from 'next/navigation'


const CloseModal = () => {
  const router=useRouter()

  return (
    <img onClick={()=>router.back()} src='/x.svg' alt='close button' className='block cursor-pointer ml-auto'/>
    )
}

export default CloseModal