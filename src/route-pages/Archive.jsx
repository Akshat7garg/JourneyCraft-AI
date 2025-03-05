import HistoryCard from '@/components/custom/HistoryCard';
import { db } from '../database/dbconfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import OathCheck from '@/components/custom/OathCheck';

function Archive() {

  const user = JSON.parse(localStorage.getItem('user'));
  const [tripCollection, setTripCollection] = useState([]);

  useEffect(() => {
    getTripData();
  }, [])

  const getTripData = async () => {
    const q = query(collection(db, 'AiTrips'), where('userEmail', '==', user?.email));

    setTripCollection([]);
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      console.log(doc.id, " ==> ", doc.data());
      setTripCollection((prevData) => [...prevData, doc.data()]);
    });
  }

  return (
    <div>
      {
        (user) ?
          <div className='height py-12 px-40 font-baloo'>
            <p className='font-extrabold text-4xl mb-8'>Generated Itinerary History 🕒</p>
            <div className='grid grid-cols-3 gap-8 my-8'>
              {
                tripCollection.map((item, index) => {
                  return <HistoryCard trip={item} key={index} />
                })
              }
            </div>
          </div>
          : <OathCheck page="History Tracker" />
      }
    </div>
  )
}

export default Archive