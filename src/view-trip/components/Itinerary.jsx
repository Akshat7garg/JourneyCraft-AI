import React from 'react'
import PlaceCard from './PlaceCard'

function Itinerary({ trip_data }) {

  return (
    <div className='font-baloo'>

      <p className='font-bold text-xl'>Recommended Itinerary</p>

      <div>

        {trip_data?.tripData?.itinerary.map((item, index) => {
          return <div key={index} className='mt-6' >
            <p className='font-bold text-lg'>{item?.day}</p>
            <div className='grid grid-cols-2 gap-5'>
              {item?.activities.map((task, idx) => {
                return <div key={idx}>
                  <p className='text-sm font-extrabold text-green-800'>{task?.time}</p>
                  <PlaceCard task={task} trip={trip_data} />

                </div>
              })}
            </div>
          </div>
        })}

      </div>

    </div>
  )
}

export default Itinerary