import { db } from "@/drizzle";
import { posts, subreddits, subscriptions, users } from "@/drizzle/schema/auth";
import { getAuthSession } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
import Link from "next/link";

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
  console.log(subredditInfo);

  if (!subredditInfo[0]) {
    return notFound();
  }

  const subscriptionInfo = !session?.user
    ? undefined
    : await db
        .select()
        .from(subscriptions)
        .leftJoin(subreddits, eq(subreddits.id, subscriptions.subredditId))
        .leftJoin(users, eq(users.id, subscriptions.authorId))
        .where(and(eq(subreddits.name, slug), eq(users.id, session?.user.id)));
  console.log(subscriptionInfo);

  const isSubscribed =
    subscriptionInfo === undefined ? false : !!subscriptionInfo[0];
  console.log(isSubscribed);

  const memberCountInfo = await db
    .select()
    .from(subscriptions)
    .leftJoin(subreddits, eq(subreddits.id, subscriptions.subredditId))
    .where(eq(subreddits.name, slug));
  console.log(memberCountInfo);

  return (
    <div className=" flex items-start p-12 gap-8 bg-gradient-to-l from-violet-500 to-violet-400  min-h-screen">
      <div className="w-full">{children}</div>
      <div className="p-4 w-3/12 bg-violet-400 flex flex-col gap-2 text-md text-gray-600 font-semibold rounded-xl">
        <h1 className="text-xl font-bold text-gray-700 mb-1">
          About r/{subredditInfo[0].subreddit.name}
        </h1>
        <p className="flex justify-between items-center">
          Created
          <span className="text-gray-500 text-sm">
            {format(
              subredditInfo[0].subreddit.createdAt.toDateString(),
              "MMMM d,yyyy"
            )}
          </span>
        </p>
        <p className="flex justify-between items-center">
          Members
          <span className="text-gray-500 text-sm">
            {memberCountInfo?.length}
          </span>
        </p>

        {subredditInfo[0].subreddit.creatorId === session?.user.id ? (
          <p className="text-gray-500 text-sm mt-2">
            You created this Community
          </p>
        ) : null}

        <Link
          href={`/r/${slug}/submit`}
          className="flex mt-1 justify-center items-center gap-2 p-2   rounded-xl w-full font-semibold bg-gray-900 text-lg text-white/80 focus:ring-2 focus:ring-violet-500 hover:text-white focus:bg-gray-950"
        >
          Create Post
        </Link>
        {subredditInfo[0].subreddit.creatorId !== session?.user.id ? (
          <SubscribeLeaveToggle
            subredditId={subredditInfo[0].subreddit.id}
            subredditName={subredditInfo[0].subreddit.name}
            isSubscribed={isSubscribed}
          />
        ) : null}
      </div>
    </div>
  );
};
export default Layout;
