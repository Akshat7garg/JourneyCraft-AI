import React, { useState, useEffect } from 'react'
import { getPlaceDetails } from '@/GlobalAPI';
import { Link } from 'react-router-dom'

function PlaceCard({ task, trip }) {


  const [photo, setPhoto] = useState();

  useEffect(() => {
    task && getPlacePhoto();
  }, [task]);

  const getPlacePhoto = async () => {
    const data = {
      textQuery: `${task?.place}, ${trip?.tripData?.tripSummary?.destination}`
    }

    const result = await getPlaceDetails(data);

    setPhoto(`${import.meta.env.VITE_GOOGLE_PLACE_PHOTO_URL}/${result.data.places[0].photos[6].name}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`)

  }

  return (
    <Link to={`${import.meta.env.VITE_GOOGLE_MAP_URL}=${task?.place},${task?.address}`} target='_blank'>
      <div className='font-baloo border-[2px] border-neutral-900 rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all duration-300 hover:shadow-md hover:shadow-black bg-white'>

        <img
          src={(photo) ? photo : '/sample.jpg'}
          className='h-[140px] w-[140px] rounded-xl '
        />
        <div>
          <p className='font-bold text-lg'>{task?.place}</p>
          <p className='text-sm text-neutral-500 font-medium'>{task?.description}</p>
          <p className='py-1 px-3 bg-neutral-200 rounded-full w-fit font-medium mt-2 text-xs border border-neutral-900'>📍 {task?.address}</p>
        </div>

      </div>
    </Link>
  )
}

export default PlaceCard