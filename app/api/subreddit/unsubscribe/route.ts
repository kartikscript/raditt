import { db } from "@/drizzle";
import { subscriptions, subreddits } from "@/drizzle/schema/auth";
import { getAuthSession } from "@/lib/auth";
import { SubredditSubscriptionValidator } from "@/lib/validators/subreddit";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorised", { status: 401 });
    }
    const body = await req.json();
    const { subredditId } = SubredditSubscriptionValidator.parse(body);

    const subscriptionInfo = await db
      .select()
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.subredditId, subredditId),
          eq(subscriptions.authorId, session.user.id)
        )
      );
    if (!subscriptionInfo[0]) {
      return new Response("you are not subscribed to this subreddit", {
        status: 400,
      });
    }

    //check if creator attempts to delete subreddit
    const subredditInfo = await db
      .select()
      .from(subreddits)
      .where(
        and(
          eq(subreddits.id, subredditId),
          eq(subreddits.creatorId, session.user.id)
        )
      );
      if(!!subredditInfo[0]){
        return new Response('You cannot unsubscribe from your own subreddit',{status:400})
      }
    await db
      .delete(subscriptions)
      .where(
        and(
          eq(subscriptions.subredditId, subredditId),
          eq(subscriptions.authorId, session.user.id)
        )
      );
    // values({
    //   authorId:session.user.id,
    //   subredditId
    // })
    return new Response(subredditId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request data passed", { status: 422 });
    }
    return new Response("Could Not Unsubscribe the Communitiy", { status: 500 });
  }
}
