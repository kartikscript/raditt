This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



export const users = pgTable("user", {
    id: serial("id").primaryKey(),
    name: text("name"),
    email: text("email").notNull().unique(),
    // emailVerified: timestamp("emailVerified", { mode: "date" }),
    image: text("image"),
    username:text("username").unique()
  });

  export const userRelations=relations(users,({one,many})=>({//users specify below relations belong to users table

    profile:one(profiles,{//specified profile property to users table and profiles table as another side table which we want to relate with
      fields:[users.id],
      references:[profiles.userId]
    }),
    post:many(posts) //user has many relation to post in one to many relation b/w users and posts user can have many posts but post can have one user
  }))

  //const result= await db.query.users.findFirst({
    // with:{ profile:true,post:true}
  // }) -->result.profile.id/title/bio

  export const profiles=pgTable('profile',{
    id:serial('id').primaryKey(),
    title:text('title'),
    bio:varchar('bio',{length:122}),
    userId:integer('userId').references(()=>users.id)
  })

  export const posts=pgTable('post',{
    id:serial('id').primaryKey(),
    text:text('text'),
    authorId:integer('author_id').notNull().references(()=>users.id)
  })

  export const categories=pgTable('categories',{
    id:serial('id').primaryKey(),
    name:varchar('name',{length:20})
  })


  export const postRelations=relations(posts,({one,many})=>({
    author:one(users,{//posts has one relation with users
      fields:[posts.authorId],
      references:[users.id]
    }),
    postCategories:many(postsOnCategories)//posts have many relation and postOnCategories has one one relation with possts
  }))

  export const categoryRelations=relations(categories,({many})=>({
    posts:many(postsOnCategories)
  }))
  //for many to many relation we create a table containing all elements by joining the two tables and each table will have one to many relation with join table in order to access category of specific post and vice versa
export const postsOnCategories=pgTable('posts_categories',{
  postId:integer('post_id').notNull().references(()=>posts.id),
  categoryId:integer('category_id').notNull().references(()=>categories.id),
},
(t)=>({///t -->represents table
  pk:primaryKey(t.categoryId,t.postId)
})
)


export const postsOnCategoriesRelations=relations(postsOnCategories,({one})=>({
  post:one(posts,{
    fields:[postsOnCategories.postId],
    references:[posts.id]
  }),
  category:one(categories,{
    fields:[postsOnCategories.categoryId],
    references:[categories.id]
  })
}))