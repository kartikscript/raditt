import { db } from "@/drizzle";
import { getAuthSession } from "@/lib/auth";
import { SubredditValidator } from "@/lib/validators/subreddit";
import { subreddits, subscriptions } from '../../../drizzle/schema/auth';
import { eq } from "drizzle-orm";
import { z } from "zod";


export async function POST(req:Request){

  try {
    const session=await getAuthSession()

    if(!session?.user){
      return new Response('Unauthorised',{status:401})
    }
    //now if user exists
    const body=await req.json()
    const {name}=SubredditValidator.parse(body)//if name is not provided then will make error in catch block

    const subredditExists= await db.select().from(subreddits).where(eq(subreddits.name,name))
    console.log(subredditExists,typeof subredditExists)
    if(subredditExists[0]){
      return new Response('Subreddit already exists',{status:409})
    }

    const newSubreddit=await db.insert(subreddits).values({
      name:name,
      creatorId:session.user.id,
    }).returning({id:subreddits.id,name:subreddits.name})

    const newSubcription=await db.insert(subscriptions).values({
      authorId:session.user.id,
      subredditId:newSubreddit[0].id
    }).execute()
    
    return new Response(newSubreddit[0].name)
  } catch (error) {
     if (error instanceof z.ZodError){
      return new Response(error.message,{status:422})
     }
     return new Response('Could Not Create Subreddit',{status:500})
  }
}