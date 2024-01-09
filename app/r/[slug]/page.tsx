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
    <div className='bg-violet-100  min-h-screen flex justify-center items-start'>
    <div className='w-9/12 rounded-lg shadow-xl  my-12 p-4 bg-violet-400'>
        <h1 className='font-bold text-3xl mb-6 text-violet-100'>r/{result[0].subreddit.name}</h1>
        <MiniCreatePost session={session}/>
    </div>
    <div>
      
    </div>
    </div>
  )
}

export default page