import Image from 'next/image'
import { User } from 'next-auth'


interface UserAvatarProps{
  user:Pick<User,'name'|'image'|'email'>
}
const UserAvatar = ({user}:UserAvatarProps) => {
  return (
    <div>
         {user.image?(
        <Image
        className='absolute right-0 top-0 '
        src={user.image}
        alt='profile image'
        fill
        referrerPolicy='no-referrer'
        />
      ):(
        <div >
          <img className='absolute right-0 top-0 ' src='/user.svg' alt='profile picture'/>
        </div>
      )}
    </div>
  )
}

export default UserAvatar