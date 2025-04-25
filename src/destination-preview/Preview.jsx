import { PREVIEW_PROMPT } from '@/constants/Constants';
import React, { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import TopPlace from '@/destination-preview/components/TopPlace';
import Restaurant from '@/destination-preview/components/Restaurant';
import HotelCard from '@/destination-preview/components/HotelCard';
import { getPlaceDetails } from '@/GlobalAPI';


/**
 * Preview component displays a destination preview based on user location input.
 * It fetches data from a backend API and renders a summary of tourist attractions,
 * restaurants, and hotels.  Includes robust error handling and loading indicators.
 *
 * @returns {JSX.Element} The Preview component
 */


function Preview() {

  // State variables
  const [location, setLocation] = useState();
  const [detail, setDetail] = useState();
  const [loader, setLoader] = useState(false);
  const [photo, setPhoto] = useState();
  const [hurdle, setHurdle] = useState('');

  /**
   * Fetches destination preview data from the backend API.
   * Handles potential errors during the API call and updates the loading state.
   */
  const generatePreview = async () => {
    if (!location) {
      alert("Location is undefined or empty. Please provide a valid location.");
      return;
    }
    setLoader(true);

    const final_prompt = PREVIEW_PROMPT.replace('{location}', location);
    console.log("Generated Prompt:", final_prompt);

    try {
      // Fetching the response from AI
      const response = await fetch("http://127.0.0.1:5000/api/insights/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: final_prompt,
      });

      // Handle API errors
      if (!response.ok) {
        const errorData = await response.json(); // Attempt to parse error details from the response
        throw new Error(`API request failed with status ${response.status}: ${errorData.message || response.statusText}`);
      }

      // Parse the JSON response from the backend
      const jsonData = await response.json();
      setDetail(jsonData?.destination);

    } catch (err) {
      console.error("Error fetching preview data:", err); // Log the error to the console for debugging
    } finally {
      setLoader(false); // Always set loading to false after the API call, regardless of success or failure
    }
  };

  /**
   * Fetches a photo of the destination using the Google Places API.
   * Handles potential errors during the API call.
   */
  useEffect(() => {
    if (detail && detail.address) { // Only fetch photo if destination details and address are available
      getPlacePhoto();
    }
  }, [detail]);

  const getPlacePhoto = async () => {
    try {
      const data = { textQuery: detail?.address }
      const result = await getPlaceDetails(data);

      setPhoto(`${import.meta.env.VITE_GOOGLE_PLACE_PHOTO_URL}/${result.data.places[0].photos[6].name}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`)

    } catch (error) {
      console.error("Error fetching photo:", error);
      setPhoto('/sample.jpg'); //Fallback to default image on error.
      setHurdle("Error: Please reload the page and try again");
    }
  };


  return (
    <div className='font-baloo px-24 py-8'> {/* Main container */}

      {/* Container for the preview content */}
      <div className='pb-8 border-b-4 border-neutral-300'>
        <p className='font-bold text-3xl mb-2'>Discover Your Next Destination 🌍</p>
        <p className='opacity-75 mb-8'>
          <span className='font-bold'>Explore the world with ease! </span>
          Our Destination Preview feature offers a comprehensive overview of your selected location, ensuring your group trip is both memorable and seamless.</p>

        {/* Place input section */}
        <div className='flex items-center justify-center gap-8 w-full'>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              location,
              onChange: (e) => { setLocation(e?.label) },
              className: 'w-1/2 shadow-md shadow-[rgb(0,0,0,0.6)] rounded-lg'
            }}
          />
          <button onClick={() => generatePreview()} on className='cursor-pointer shadow-md shadow-[rgb(0,0,0,0.6)] bg-neutral-900 h-full px-4 py-2 rounded-lg font-medium text-green-400 font-baloo hover:text-green-200 transition-all duration-300'>🔍 Explore</button>
        </div>
      </div>



      <div className='w-full'>
        {
          // Conditionally render loading indicator
          (loader) ?
            // Loading message
            <div className='font-bold text-xl text-green-500 flex items-center justify-center gap-4 p-8'>
              <Loader2 className="animate-spin" />
              <span className='text-neutral-900'>Please wait, our AI Model is generating the result</span>
            </div>

            :

            // Conditionally render destination details
            (detail) ?
              // Rendering the response
              <div className='p-8 w-full'>

                <div className='flex items-center justify-start w-full gap-8 pb-8 border-b-4 border-neutral-300'>
                  <img src={(photo) ? photo : '/sample.jpg'}
                    className='h-[300px] min-w-[400px] rounded-xl'
                  />
                  <p className='font-bold text-3xl'>🛩️ {detail?.address}</p>
                </div>

                {/* Listing places for main tourist attraction */}
                <div className='flex items-start justify-center flex-col gap-4 w-full pt-6 pb-4 border-b-4 border-neutral-300'>
                  <p className='text-2xl font-extrabold'>Tourist Attractions 🎡</p>
                  <div className='grid grid-cols-3 gap-24 w-full'>
                    {detail?.touristAttractions.map((item, index) => {
                      return <TopPlace place={item} dest={detail} key={index} />
                    })}
                  </div>
                </div>

                {/* Listing most famous restaurants */}
                <div className='flex items-start justify-center flex-col gap-4 w-full pt-6 pb-4 border-b-4 border-neutral-300'>
                  <p className='text-2xl font-extrabold'>Famous Restaurants 🥡</p>
                  <div className='grid grid-cols-3 gap-24 w-full'>
                    {detail?.restaurants.map((item, index) => {
                      return <Restaurant place={item} dest={detail} key={index} />
                    })}
                  </div>
                </div>

                {/* Listing hotels with good hospitality */}
                <div className='flex items-start justify-center flex-col gap-4 w-full pt-6'>
                  <p className='text-2xl font-extrabold'>Top Hotels 🏨</p>
                  <div className='grid grid-cols-3 gap-24 w-full'>
                    {detail?.hotels.map((item, index) => {
                      return <HotelCard place={item} dest={detail} key={index} />
                    })}
                  </div>
                </div>
              </div>

              :

              // Loading message
              <div className='font-bold text-xl text-red-600 flex items-center justify-center gap-4 p-8'>
                {hurdle}
              </div>
        }
      </div>
    </div>
  )
}

export default Preview