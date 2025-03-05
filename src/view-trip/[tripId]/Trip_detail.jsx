import { db } from '@/database/dbconfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfoSection from '../components/InfoSection';
import Itinerary from '../components/Itinerary';


/**
 * Trip_detail component displays detailed information about a specific trip.
 * It fetches trip data from Firestore based on the tripId from the URL parameters.
 */


function Trip_detail() {

    // State variables
    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);

    /**
     * useEffect hook to fetch trip data when tripId changes.
     * The empty dependency array [] ensures this runs only once after the initial render.  The [tripId] dependency array makes it run whenever tripId changes.
     */
    useEffect(() => {
        tripId && get_tripdata();
    }, [tripId]);

    /**
     * Asynchronous function to fetch trip data from Firestore.
     * It retrieves a document from the 'AiTrips' collection based on the tripId.
     */
    const get_tripdata = async () => {
        const docRef = doc(db, 'AiTrips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log(docSnap.data());
            setTrip(docSnap.data());
        }
        else {
            alert("No such data found! Please try again");
        }
    }

    return (
        <div className='py-8 px-40'>
            <InfoSection trip_data={trip} />
            <Itinerary trip_data={trip} />
        </div>
    )
}

export default Trip_detail