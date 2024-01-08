import { db } from '@/drizzle'
import { posts, subreddits } from '@/drizzle/schema/auth'
import { getAuthSession } from '@/lib/auth'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import React from 'react'
import MiniCreatePost from '../../../components/MiniCreatePost'

interface PageProps{
  params:{
    slug:string
  }
}
const page = async ({params}:PageProps) => {
  const {slug} =params
  const session= getAuthSession()

  const result=await db.select().from(subreddits).where(eq(subreddits.name,slug)).leftJoin(posts,eq(subreddits.creatorId,posts.authorId)).limit(2)

  if(!result[0]){
   return notFound()
  }
  console.log(result)
  
  return (
    <div>
        <h1>r/{result[0].subreddit.name}</h1>
        <MiniCreatePost/>
    </div>
  )
}

export default page