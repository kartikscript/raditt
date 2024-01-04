import SignInClient from "@/components/sign-in-client";
import { getAuthSession } from "@/lib/auth";


export default async function Home() {
  // const session = await getAuthSession();
  return (
    <main className="flex bg-violet-200 min-h-screen flex-col items-center justify-between p-24">
      {/* <SignInClient />
      <pre>{JSON.stringify(session, null, 2)}</pre> */}
      home
    </main>
  );
}
