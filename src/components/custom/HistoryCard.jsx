import React, { useEffect, useState } from 'react'
import { getPlaceDetails } from '@/GlobalAPI';
import { Link } from 'react-router-dom'

function HistoryCard({ trip }) {

    const [photo, setPhoto] = useState();

    useEffect(() => {
        trip && getPlacePhoto();
    }, [trip]);

    const getPlacePhoto = async () => {
        const data = {
            textQuery: trip?.tripData?.tripSummary?.destination
        }

        const result = await getPlaceDetails(data);

        setPhoto(`${import.meta.env.VITE_GOOGLE_PLACE_PHOTO_URL}/${result.data.places[0].photos[6].name}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`)

    }

    return (
        <Link to={'/trip-data/' + trip?.id}>
            <div className='font-baloo hover:scale-105 transition-all duration-300'>
                <img
                    src={(photo) ? photo : '/sample.jpg'}
                    className='object-cover rounded-xl h-[180px] w-full'
                />

                <div className='my-4'>
                    <p className='font-bold text-lg'>{trip?.tripData?.tripSummary?.destination}</p>
                    <div className='flex items-center justify-center gap-4 px-2 text-sm font-medium'>
                        <p className='py-1 px-3 bg-neutral-200 rounded-full text-neutral-600 border border-neutral-900'>🗓️ {trip?.tripData?.tripSummary?.startDate}</p>
                        <p className='py-1 px-3 bg-neutral-200 rounded-full text-neutral-600 border border-neutral-900'>🗓️ {trip?.tripData?.tripSummary?.endDate}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default HistoryCard