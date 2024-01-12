'use client'

import { SubscribeToSubredditPayload } from "@/lib/validators/subreddit";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { toast } from "react-toastify";

interface SubscribeLeaveToggleProps{
  subredditId:string
  subredditName:string
  isSubscribed:boolean
}
const SubscribeLeaveToggle = ({subredditId,subredditName,isSubscribed}:SubscribeLeaveToggleProps) => {

  const router=useRouter()
  const [isLoading,setIsLoading]=useState(false)
  
  const {mutate:subscribe}=useMutation({
    mutationFn:async ()=>{
      setIsLoading(true)
      const payload:SubscribeToSubredditPayload={
        subredditId:subredditId
      } 
      const {data}=await axios.post('/api/subreddit/subscribe',payload)
      return data as string
    },
    onError:(err)=>{
      setIsLoading(false)
      if(err instanceof AxiosError){
        if(err.response?.status===400){
          return toast.error('You have already subscribed to this subreddit !',{position:'top-center'})
        } 
        if(err.response?.status===422){
          return toast.error('Invalid data request passed !',{position:'top-center'})
        }
        if(err.response?.status===401){
          return toast.error('You must be logged in to Subscribe Subreddit !',{position:'top-center'})
        }
      }
      return toast.error('An Error Occured :Could not Subscribe !',{position:'top-center'})

    },
    onSuccess:()=>{
      setIsLoading(false)
      startTransition(()=>{
            router.refresh()
      })
      
      return toast.success(`Subscribed !:You are now Subscribed to r/${subredditName}`)
    }
  })

  const {mutate:unSubscribe}=useMutation({
    mutationFn:async ()=>{
      setIsLoading(true)
      const payload:SubscribeToSubredditPayload={
        subredditId:subredditId
      } 
      const {data}=await axios.post('/api/subreddit/unsubscribe',payload)
      return data as string
    },
    onError:(err)=>{
      setIsLoading(false)
      if(err instanceof AxiosError){
        if(err.response?.status===400){
          return toast.error('You have already Unsubscribed to this subreddit !',{position:'top-center'})
        } 
        if(err.response?.status===422){
          return toast.error('Invalid data request passed !',{position:'top-center'})
        }
        if(err.response?.status===401){
          return toast.error('You must be logged in to Unsubscribe Subreddit !',{position:'top-center'})
        }
      }
      return toast.error('An Error Occured :Could not Unsubscribe !',{position:'top-center'})

    },
    onSuccess:()=>{
      setIsLoading(false)
      startTransition(()=>{
            router.refresh()
      })
      
      return toast.success(`Subscribed !:You are now unsubscribed from r/${subredditName}`)
    }
  })


  return (
    <div className="mt-3">
      {isSubscribed ? (
               <button onClick={()=>unSubscribe()} className='flex justify-center items-center gap-2 p-2   rounded-xl w-full font-semibold bg-gray-900 text-lg text-white/80 focus:ring-2 focus:ring-violet-500 hover:text-white focus:bg-gray-950'>
               {isLoading && <img src='/loaderr.svg' alt='loader' className='w-6 h-6'/>}Leave Community
            </button>
      ) : (
        <button onClick={()=>subscribe()} className='flex justify-center items-center gap-2 p-2   rounded-xl w-full font-semibold bg-gray-900 text-lg text-white/80 focus:ring-2 focus:ring-violet-500 hover:text-white focus:bg-gray-950'>
           {isLoading && <img src='/loaderr.svg' alt='loader' className='w-6 h-6'/>}Join to Post
        </button>
      )}
    </div>
  );
};

export default SubscribeLeaveToggle;
