import Editor from "@/components/Editor"
import { db } from "@/drizzle"
import { subreddits } from "@/drizzle/schema/auth"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"



interface PageProps{
  params:{
    slug:string
  }
}
const page = async ({params}:PageProps) => {
  const {slug} =params

  const subredditInfo= await db.select().from(subreddits).where(eq(subreddits.name,slug))

  if(!subredditInfo[0]){
    return notFound()
  }


  return (
    <div className=' flex justify-center items-start'>
    <div className='w-full rounded-lg shadow-xl  p-4 bg-violet-400'>
       <h1 className='font-bold text-3xl mb-6 text-gray-800'>Create Post <span className="text-gray-600 text-xl">in r/{`${slug}`}</span></h1>
       <Editor/>
    </div>
    </div>
  )
}

export default page