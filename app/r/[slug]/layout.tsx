import { db } from "@/drizzle";
import { posts, subreddits, subscriptions, users } from "@/drizzle/schema/auth";
import { getAuthSession } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const session = await getAuthSession();
  const { slug } = params;

  const subredditInfo = await db
    .select()
    .from(subreddits)
    .where(eq(subreddits.name, slug))
    .leftJoin(posts, eq(subreddits.creatorId, posts.authorId));
console.log(subredditInfo)
  if(!subredditInfo){
    return notFound()
  }
  const subscriptionInfo =!session?.user ? undefined : await db
    .select()
    .from(subscriptions)
    .leftJoin(subreddits, eq(subreddits.id, subscriptions.subredditId))
    .leftJoin(users, eq(users.id, subscriptions.authorId))
    .where(and(eq(subreddits.name,slug),eq(users.id,session?.user.id)))
  console.log(subscriptionInfo )
    
  const isSubscribed=!!subscriptionInfo
  console.log(isSubscribed)
  
//   const memberCountInfo=await db.select().from(subscriptions).leftJoin(subreddits,eq(subreddits.id,subscriptions.subredditId)).where(eq(subreddits.name,slug))
//   console.log(memberCountInfo)
// const memberCount=memberCountInfo[0].subscription
  return(
     <div className="flex justify-around">
      <div className="w-4/6">
      {children}
      </div>
      <div className="w-full flex flex-col gap-2" >
          <p className="flex justify-between items-center">Created{subredditInfo[0].subreddit.createdAt.toDateString()}</p>

      </div>
    </div>);
};
export default Layout;
