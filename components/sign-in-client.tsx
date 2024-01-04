"use client";

import { signIn, signOut } from "next-auth/react";

function SignInClient() {
  const loginWithDiscord = async () => {
    try {
      console.log("google");
      await signIn("google");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button onClick={loginWithDiscord}>Sign In</button>
      <button
        onClick={() => {
          signOut();
        }}
      >
        sign out
      </button>
    </>
  );
}

export default SignInClient;
