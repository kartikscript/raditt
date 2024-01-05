import Link from "next/link"
import UserAuthForm from "./UserAuthForm"

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <img className="bg-violet-300 p-2 rounded-full" src="/reddit-logo.svg" alt="reddit logo" />
      <h1 className="text-3xl font-semibold tracking-tight ">Sign Up</h1>
      <p className="text-xs text-center text-gray-300 font-light">By Continuing ,you are setting up a new Raditt account and agree to our User Agreements and Privacy Policy.</p>
      <UserAuthForm/>
      <p className="text-sm text-gray-600 font-medium">Already a User ? <Link href='/sign-in' className="text-violet-300 hover:text-violet-400 focus:text-violet-400 underline underline-offset-2">Click here to sign in</Link></p>      
    </div>
  )
}

export default SignUp