import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/database/dbconfig';
import io from "socket.io-client";
import OathCheck from '@/components/custom/OathCheck';


const socket = io("http://localhost:3000");


function Chatroom() {

  const user = JSON.parse(localStorage.getItem('user'));
  const group = JSON.parse(localStorage.getItem('group'));
  const [userList, setUserList] = useState();
  const [trip_data, setTrip_data] = useState([]);
  const [found, setFound] = useState(false)
  

  const [userName, setUserName] = useState("");
    const [groupName, setGroupName] = useState("");
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
  
    const joinGroup = () => {
      setGroupName(group?.type)
      setUserName(group?.member)
      socket.emit("joinGroup", { userName, groupName });
    };
  
    const sendMessage = () => {
      if (message) {
        socket.emit("sendMessage", { groupName, userName, message });
        setMessage("");
      }
    };
  
    useEffect(() => {
      getGroupInfo();
      joinGroup();
      socket.on("receiveMessage", (data) => {
        setChat((prev) => [...prev, data]);
      });
      return () => socket.off("receiveMessage");
    });

  const getGroupInfo = async () => {
    const docRef = doc(db, "GroupInfo", group?.type);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserList(docSnap.data());
      setFound(true);
    } else {
      // docSnap.data() will be undefined in this case
      setFound(false);
      console.log("No such document!");
    }
    getItinerary();
  }
 
  const getItinerary = async()=> {
    const docRef = doc(db, "ActiveTrips", user?.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTrip_data(docSnap.data());
      setFound(true);
    } else {
      // docSnap.data() will be undefined in this case
      setFound(false);
      console.log("No such document!");
    }
  }

  return (
    (!user)

      ? <OathCheck page={'Group Collaboration'} />

      : 

      (group)

      ? <div className='height w-full grid grid-cols-6 grid-rows-6 gap-8 p-8 font-baloo'>
      <div className='col-span-4 row-span-6 rounded-xl border-[2px] border-neutral-500 p-4 flex flex-col bg-neutral-400 shadow-lg shadow-black'>

        <p className='text-center text-xl pb-4 font-extrabold'>
          Chat Section
        </p>


        <div className='h-[100%] overflow-y-scroll scroll-hiding back-image rounded-xl border-[2px] border-neutral-500 p-4 bg-green-100 shadow-inner shadow-black w-full'>
        {chat.map((msg, index) => (
          <div
          key={index} className={`flex mb-2 ${msg.userName === userName ? 'justify-end' : 'justify-start'}`}>
              <p 
              className={`py-2 px-4 text-white w-fit rounded-xl ${msg.userName === userName ? 'bg-green-700' : ' bg-neutral-700'}`}>
                <strong>{msg.userName}:</strong> {msg.message}
              </p>
              </div>
            ))}
        
        
        </div>


        <div className='w-full flex items-center justify-center gap-4 pt-4'>
          <Input type='text' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Enter your message' className='w-1/2 h-full shadow-md shadow-[rgb(0,0,0,0.6)] font-bold' />
          <button
          onClick={sendMessage}
            className='py-1 px-2 border-[2px] border-green-700 rounded-lg font-medium hover:bg-green-700 hover:shadow-[0px_0px_9px_black] hover:text-white transition-all duration-200 bg-green-100 text-green-800'>
            <Send size={30} />
          </button>
        </div>
      </div>



      <div className='col-span-2 row-span-2 rounded-xl p-4 flex flex-col gap-2 border-[2px] border-neutral-500 bg-neutral-400 shadow-lg shadow-black'>
        <div className='text-center text-xl font-extrabold'>Group Info</div>
        <div className='scroll-hiding overflow-x-scroll w-full flex gap-4'>
        {userList?.userInfo.map((item, index)=> {
          return <div key={index} className='rounded-xl flex items-center justify-center flex-col bg-green-100 shadow-inner shadow-black text-neutral-900 border-[2px] border-neutral-500 py-2 w-28 font-semibold'>
            <img src={item?.picture} alt="" className='rounded-full h-[42px] w-[42px]' />
            <span>{item?.name}</span>
          </div>
        })}
        </div>
      </div>


      <div className='col-span-2 row-span-4 rounded-xl p-4 flex flex-col gap-2 border-[2px] border-neutral-500 bg-neutral-400 shadow-lg shadow-black'>
        <div className='text-center text-xl font-extrabold'>Your Itinerary</div>
        <div className='flex overflow-y-scroll scroll-hiding flex-col gap-6 h-[400px] w-full p-2 rounded-xl'>
          {trip_data?.tripData?.itinerary.map((item, index)=> {
            return <div className='w-full rounded-xl border-[2px] border-neutral-500 bg-green-100 shadow-inner shadow-black flex flex-col gap-3 p-4'>
              <p className='font-bold'>{item?.day}</p>
              {item?.activities.map((task, idx) => {
                return <div key={idx} className='flex w-full flex-col p-2 rounded-xl border-[2px] border-neutral-500 bg-white shadow-md shadow-black'>
                  <span className='text-green-800 font-bold'>{task?.time}</span>
                  <span className='text-neutral-900 text-sm'>{task?.description}</span>
                </div>
              })}
            </div>
          })}
        </div>
      </div>
    </div>
    :
    <div className='height w-full flex text-lg font-extrabold opacity-75 items-center justify-center font-baloo'>You are not a part of any active group</div>
    
  )
}

export default Chatroom