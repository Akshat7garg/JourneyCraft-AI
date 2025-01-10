"use client"
import { useSession} from "next-auth/react";


export default function Home() {
  const session=useSession()
  console.log(session);
  
  if(!session){
    return <div>
      You are not logged in
    </div>
  }
 

  return <div>
    <h1>{JSON.stringify(session.data?.user?.name)}</h1>
    <p>{JSON.stringify(session.data?.user?.email)}</p>
  </div>

  
  

  
}
