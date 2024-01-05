import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql);

// eq equal operator await db.select().from(users).where(eq(users.id,2)) 
// ne not-equal operator await db.select().from(users).where(ne(users.id,2))  will give all users expect user with id=2
//gt greater than where(gt(users.id,7)) returns user with gt id=7 ...similarily gte,lt,lte
//isNull ..where(isNull(users.address)) will return those users who have no address filled address===null
//isNotNull opposite of it
//inArray ..where(inArray(users.id,[1,2,3,4])) those users who have id matched to any elememnt defined in array
//notInArray opposite
//between ..where(between(users.id,1,8)) all users of id from 1 to 8
//notBetween
//like ..where(like(users.name,'%ro%')) %ro(users name ends with ro) means all before ro gets neglected ro% means all after eg 'robin%' user with name robin vims
//notLike ..where(notLike(users.name,'Alan%')) all names whose name dont start with Alan

//instead of using like and notLike ,eq and ne we can use 
//not ..where(not(eq(users.id,8))) can be used in any operators
//and ..where(and(like(users.name,'%a%'),gt(users.id,8))) users with a in their name and id gt 8 
//or works as or operator