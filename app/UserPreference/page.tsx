"use client"
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const UserPrefence = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [source,setSource]=useState("")
  const [dest,setDest]=useState("")
  const [depDate,setDeptDate]=useState("")
  const [arrDate,setArrDate]=useState("")
  const [adult,setAdult]=useState<Number>(0)
  const [Children,setchildren]=useState(0)
  const [AddText,setAddtext]=useState("")
  

  // Wait for session data to load
  useEffect(() => {
    if (status === "loading") return // Do nothing while loading
    if (!session) {
      // Redirect if not authenticated
      router.push('/api/auth/signin?callbackUrl=/UserPreference')
    }
  }, [status, session, router])

  if (status === "loading") {
    return <p>Loading...</p> // Show loading state while session is being fetched
  }

  return (
    <div className='flex flex-col justify-center items-center'>
      <input onChange={(e)=>{
        setSource(e.target.value)
      }} type="text" placeholder='Select the source' />
      <input onChange={(e)=>{
        setDest(e.target.value)
      }}  type="text" placeholder='Select the Destination' />
      <input onChange={(e)=>{
        setDeptDate(e.target.value)
      }} type="date" placeholder='Departure Date' />
      <input onChange={(e)=>{
        setArrDate(e.target.value)
      }} type='date' placeholder='Arrival Date' />
      <input onChange={(e)=>{
        setAdult(parseInt(e.target.value))
      }} type="Number" placeholder='Number of Adults' />
      <input onChange={(e)=>{
        setchildren(parseInt(e.target.value))
      }}   type='Number' placeholder='Number of Children' />
      <input onChange={(e)=>{
        setAddtext(e.target.value)
      }}  type="text" placeholder='AdditionalText' />
      <button onClick={async(e)=>{
        await axios.post('http://localhost:3000/api/userPreference',{
          userId:session?.user.id,
          from:source,
          to:dest,
          depDate,
          arrivalDate:arrDate,
          adult,
          children:Children,
          addInput:AddText

        })
      }}>Add User Prefernce</button>

      
    </div>
  )
}

export default UserPrefence

