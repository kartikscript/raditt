import { relations } from "drizzle-orm";
import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  serial,
  varchar,
  date,
  json,
  foreignKey,
  AnyPgColumn,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "next-auth/adapters";


export const accounts = pgTable(
  "account",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
);
  


// export const users = pgTable("user", {
//     id: serial("id").primaryKey(),
//     name: text("name"),
//     email: text("email").notNull().unique(),
//     // emailVerified: timestamp("emailVerified", { mode: "date" }),
//     image: text("image"),
//     username:text("username").unique()
//   });

//   export const userRelations=relations(users,({one,many})=>({//users specify below relations belong to users table

//     profile:one(profiles,{//specified profile property to users table and profiles table as another side table which we want to relate with
//       fields:[users.id],
//       references:[profiles.userId]
//     }),
//     post:many(posts) //user has many relation to post in one to many relation b/w users and posts user can have many posts but post can have one user
//   }))

//   //const result= await db.query.users.findFirst({
//     // with:{ profile:true,post:true}
//   // }) -->result.profile.id/title/bio

//   export const profiles=pgTable('profile',{
//     id:serial('id').primaryKey(),
//     title:text('title'),
//     bio:varchar('bio',{length:122}),
//     userId:integer('userId').references(()=>users.id)
//   })

//   export const posts=pgTable('post',{
//     id:serial('id').primaryKey(),
//     text:text('text'),
//     authorId:integer('author_id').notNull().references(()=>users.id)
//   })

//   export const categories=pgTable('categories',{
//     id:serial('id').primaryKey(),
//     name:varchar('name',{length:20})
//   })


//   export const postRelations=relations(posts,({one,many})=>({
//     author:one(users,{//posts has one relation with users
//       fields:[posts.authorId],
//       references:[users.id]
//     }),
//     postCategories:many(postsOnCategories)//posts have many relation and postOnCategories has one one relation with possts
//   }))

//   export const categoryRelations=relations(categories,({many})=>({
//     posts:many(postsOnCategories)
//   }))
//   //for many to many relation we create a table containing all elements by joining the two tables and each table will have one to many relation with join table in order to access category of specific post and vice versa

// export const postsOnCategories=pgTable('posts_categories',{
//   postId:integer('post_id').notNull().references(()=>posts.id),
//   categoryId:integer('category_id').notNull().references(()=>categories.id),
// },
// (t)=>({///t -->represents table
//   pk:primaryKey(t.categoryId,t.postId)
// })
// )


// export const postsOnCategoriesRelations=relations(postsOnCategories,({one})=>({
//   post:one(posts,{
//     fields:[postsOnCategories.postId],
//     references:[posts.id]
//   }),
//   category:one(categories,{
//     fields:[postsOnCategories.categoryId],
//     references:[categories.id]
//   })
// }))


export const users = pgTable("user", {
  id: uuid('id').defaultRandom().primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    username:text("username").unique()
  });

export const subreddits=pgTable('subreddit',{
  // id:serial('id').primaryKey(),
  id: uuid('id').defaultRandom().primaryKey(),
  
  name:text('name').notNull().unique(),
  createdAt:timestamp('created_at',{precision:6,withTimezone:false}).notNull().defaultNow(),
  updatedAt:date('updated_at',{mode:"date"}).defaultNow(),
  creatorId:uuid('creator_id').notNull().references(()=>users.id)
})

export const posts=pgTable('post',{
  id: uuid('id').defaultRandom().primaryKey(),
  title:text('title').notNull(),
  content:json('content'),
  createdAt:timestamp('created_at',{precision:6,withTimezone:false}).notNull().defaultNow(),
  updatedAt:date('updated_at',{mode:"date"}).defaultNow(),

  subredditId:uuid('subreddit_id').notNull().references(()=>subreddits.id),
  authorId:uuid('author_id').notNull().references(()=>users.id)
})

export const comments=pgTable('comment',{
  id: uuid('id').defaultRandom().primaryKey(),
  text:text('text').notNull(),
  createdAt:timestamp('created_at',{precision:6,withTimezone:false}).notNull().defaultNow(),

  postId:uuid('post_id').notNull().references(()=>posts.id),
  authorId:uuid('author_id').notNull().references(()=>users.id),
  replyTo: uuid("reply_to").references((): AnyPgColumn => comments.id),
})

export const replies=pgTable('reply',{
  id: uuid('id').defaultRandom().primaryKey(),
  text:text('text').notNull(),
  createdAt:timestamp('created_at',{precision:6,withTimezone:false}).notNull().defaultNow(),

  authorId:uuid('author_id').notNull().references(()=>users.id),
  commentId:uuid('comment_id').notNull().references(()=>comments.id),
  replyTo: uuid("reply_to").references((): AnyPgColumn => replies.id),

})

export const VoteType = pgEnum('voteType', ['UP', 'DOWN']);

export const commentVotes=pgTable('comment_vote',{
  authorId:uuid('author_id').notNull().references(()=>users.id),
  commentId:uuid('comment_id').notNull().references(()=>comments.id),
  type:VoteType('type')
})

export const votes=pgTable('vote',{
  authorId:uuid('author_id').notNull().references(()=>users.id),
  postId:uuid('post_id').notNull().references(()=>posts.id),
  type:VoteType('type')
})

export const subscriptions=pgTable('subscription',{
  authorId:uuid('author_id').notNull().references(()=>users.id),
  subredditId:uuid('subreddit_id').notNull().references(()=>subreddits.id),
})


///////////////
///RELATIONS
export const userRelations=relations(users,({one,many})=>({
  subreddit:many(subreddits),
  post:many(posts),
  comment:many(comments),
  reply:many(replies),
  commentVote:many(commentVotes),
  vote:many(votes)
}))

export const subredditRelations=relations(subreddits,({one,many})=>({
  post:many(posts),
  author:one(users,{
    fields:[subreddits.creatorId],
    references:[users.id]
  })
}))

export const postRelations=relations(posts,({one,many})=>({
  subreddit:one(subreddits,{
    fields:[posts.subredditId],
    references:[subreddits.id]
  }),
  author:one(users,{
    fields:[posts.authorId],
    references:[users.id]
  }),
  comment:many(comments),
  vote:many(votes)
}))

export const commentRelations=relations(comments,({one,many})=>({
  post:one(posts,{
    fields:[comments.postId],
    references:[posts.id]
  }),
  author:one(users,{
    fields:[comments.authorId],
    references:[users.id]
  }),
  reply:many(replies),
  commentVote:many(commentVotes)
}))

export const replyRelations=relations(replies,({one,many})=>({
  author:one(users,{
    fields:[replies.authorId],
    references:[users.id]
  }),
  comment:one(comments,{
    fields:[replies.commentId],
    references:[comments.id]
  })
}))

export const commentVotesRelations=relations(commentVotes,({one,many})=>({
  author:one(users,{
    fields:[commentVotes.authorId],
    references:[users.id]
  }),
  comment:one(comments,{
    fields:[commentVotes.commentId],
    references:[comments.id]
  })

}))

export const votesRelations=relations(votes,({one,many})=>({
  author:one(users,{
    fields:[votes.authorId],
    references:[users.id]
  }),
  post:one(posts,{
    fields:[votes.postId],
    references:[posts.id]
  })

}))

export const subsriptionsRelations=relations(subscriptions,({one,many})=>({
  author:one(users,{
    fields:[subscriptions.authorId],
    references:[users.id]
  }),
  subreddit:one(subreddits,{
    fields:[subscriptions.subredditId],
    references:[subreddits.id]
  })
}))