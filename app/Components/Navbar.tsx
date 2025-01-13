"use client";
import { signIn, signOut, useSession } from "next-auth/react"


export const Navbar = () => {
  const session=useSession()
  var isSession=false
  if(session){
    isSession=true
  }
  
  
  
    return( <div className="h-16 w-full flex gap-x-4 items-center justify-center bg-slate-600">
      
      
    <button  onClick={() => signIn()}>Signin</button>
    <button onClick={() => signOut()}>Sign out</button>
  </div>)
}