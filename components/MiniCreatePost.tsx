'use client'
import { usePathname, useRouter } from 'next/navigation'
import UserAvatar from './UserAvatar'
import { Session } from 'next-auth'


interface MiniCreatePostProps{
  session:Session|null
}
const MiniCreatePost = ({session}:MiniCreatePostProps) => {
  const router=useRouter()
  const pathname=usePathname()
  
  const user =session?.user
  
  return (<div className='flex gap-3 items-center '>
              <div className='relative h-10 w-10 '>
                <UserAvatar user={user}/>
                <span className='absolute bottom-0 right-0 h-4 w-4 border-2 border-violet-400 overflow-visible bg-green-500 rounded-full'/>
              </div>
            <div className=' flex justify-between items-center gap-2'>
            <input placeholder='Create Post' onClick={()=>router.push(`${pathname}/submit`)} className='py-1 rounded-lg bg-gray-700 px-2 text-white font-medium text-lg '/>
            <div className='flex gap-1'>
                <button className='hover:bg-violet-200 p-1 transition-all rounded-full overflow-hidden'><img src='/image.svg'/></button>
                <button className='hover:bg-violet-200 p-1 transition-all rounded-full overflow-hidden'><img src='/link.svg'/></button>
            </div>
            </div>
      </div>
  )
}

export default MiniCreatePost