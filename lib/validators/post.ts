import z from 'zod'

//for server side to validate
export const PostValidator=z.object({
  title:z.string().min(3,{message:'A title must have atleast 3 characters'}).max(120,{message:'A title must have atmost 120 characters'}),
  subredditId:z.string(),
  content:z.any()
})

//for client side
export type PostCreationRequest=z.infer<typeof PostValidator>