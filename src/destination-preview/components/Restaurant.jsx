import React, { useState, useEffect } from 'react'
import { getPlaceDetails } from '@/GlobalAPI';
import { Link } from 'react-router-dom'


/**
 * Restaurant component displays information about a single restaurant, including a photo,
 * name, cuisine, and address.  It uses the Google Places API to fetch a photo of the
 * restaurant and creates a link to its location on Google Maps.  Includes robust error
 * handling for photo retrieval.
 *
 * @param {object} place - An object containing restaurant details (name, cuisine, address).
 * @param {object} dest - An object containing destination details (address).  Used to refine the photo search.
 * @returns {JSX.Element} The Restaurant component.
 */


function Restaurant({ place, dest }) {

    // State variables
    const [photo, setPhoto] = useState();

    /**
     * Fetches a photo of the restaurant using the Google Places API. Handles errors gracefully.
     */
    useEffect(() => {
        if (place && place.name) { // Only fetch photo if destination details and name are available
            getPlacePhoto();
        }
    }, [place]);

    const getPlacePhoto = async () => {
        try {
            const data = { textQuery: `${place?.name}, ${dest?.address}` }
            const result = await getPlaceDetails(data);

            setPhoto(`${import.meta.env.VITE_GOOGLE_PLACE_PHOTO_URL}/${result.data.places[0].photos[6].name}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`)

        } catch (error) {
            console.error("Error fetching photo:", error);
            setPhoto('/sample.jpg'); //Fallback to default image on error.
            setHurdle("Error: Please reload the page and try again");
        }
    };

    return (
        // Card content
        <Link to={`${import.meta.env.VITE_GOOGLE_MAP_URL}=${place?.name},${dest?.address}`} target='_blank'>
            <div className='hover:scale-105 transition-all duration-300 font-baloo'>

                <img
                    src={(photo) ? photo : '/sample.jpg'}
                    className='h-[180px] w-full rounded-xl '
                />
                <div className='my-2 space-y-1'>
                    <p className='font-bold text-center'>{place?.name}</p>
                    <p className='text-sm opacity-75'>🥕 {place?.cuisine}</p>
                    <p className='text-sm font-medium opacity-75'>📍 {place?.address}</p>
                </div>
            </div>
        </Link>
    )
}

export default Restaurant