"use client";

import { signIn, signOut } from "next-auth/react";

function SignInClient() {
  const loginWithDiscord = async () => {
    try {
      console.log("discord");
      await signIn("discord");
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
