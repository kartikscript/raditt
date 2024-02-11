import { db } from '@/drizzle'
import { posts, subreddits } from '@/drizzle/schema/auth'
import { getAuthSession } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import MiniCreatePost from '../../../components/MiniCreatePost'

interface PageProps{
  params:{
    slug:string
  }
}
const page = async ({params}:PageProps) => {
  const {slug} =params
  const session= await getAuthSession()

  const result=await db.select().from(subreddits).where(eq(subreddits.name,slug)).leftJoin(posts,eq(subreddits.creatorId,posts.authorId)).limit(2)

  if(!result[0]){
   return notFound()
  }
  console.log(result)
  
  return (
    <div className=' flex justify-center items-start'>
    <div className='w-full rounded-lg shadow-xl  p-4 bg-violet-500'>
        <h1 className='font-extrabold text-4xl mb-6 text-gray-800'>r/{result[0].subreddit.name}</h1>
        <MiniCreatePost session={session}/>
    </div>
    <div>
      
    </div>
    </div>
  )
}

export default page