import Image from 'next/image'
import { User } from 'next-auth'


interface UserAvatarProps{
  user:Pick<User,'name'|'image'|'email'>
}
const UserAvatar = ({user}:UserAvatarProps) => {
  return (
    <div className='aspect-square   overflow-hidden'>
         {user.image?(
        <img
        src={user.image}
        alt='profile image'
        className='rounded-full w-10 h-10'
        referrerPolicy='no-referrer'
        />
      ):(
        <div >
          <img  src='/user.svg' alt='profile picture'/>
        </div>
      )}
    </div>
  )
}

export default UserAvatar