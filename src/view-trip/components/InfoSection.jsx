import React, { useEffect, useState } from 'react'
import { getPlaceDetails } from '@/GlobalAPI';
import { Loader2 } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/database/dbconfig';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Link, useNavigate } from 'react-router-dom';

function InfoSection({ trip_data }) {

    const nav = useNavigate();

    const [photo, setPhoto] = useState();
    useEffect(() => {
        trip_data && getPlacePhoto() && checkActive();
    }, [trip_data]);

    const getPlacePhoto = async () => {
        const data = {
            textQuery: trip_data?.tripData?.tripSummary?.destination
        }

        const result = await getPlaceDetails(data);

        setPhoto(`${import.meta.env.VITE_GOOGLE_PLACE_PHOTO_URL}/${result.data.places[0].photos[6].name}/media?maxHeightPx=600&maxWidthPx=600&key=${import.meta.env.VITE_GOOGLE_PLACE_API_KEY}`)

    }


    const user = JSON.parse(localStorage.getItem('user'));

    const [active, setActive] = useState(false);

    const checkActive = async () => {
        const docRef = doc(db, "ActiveTrips", user?.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            if (docSnap.data().id == trip_data?.id) {
                setActive(true);
            }
        }
    }


    const [loader, setLoader] = useState(false);

    const solo = async () => {
        setLoader(true);
        await setDoc(doc(db, "ActiveTrips", trip_data?.userEmail), {
            tripData: trip_data?.tripData,
            userEmail: user?.email,
            userName: user?.name,
            id: trip_data?.id,
        });
        setLoader(false);
        const group = { member: user?.name, type: '' }
        localStorage.setItem('group', JSON.stringify(group));
        nav('/');
    }

    const group = async () => {
        setLoader(true);
        const groupId = `${trip_data?.tripData?.tripSummary?.startDate}, ${trip_data?.tripData?.tripSummary?.destination}`;

        const groupRef = doc(db, 'GroupInfo', groupId);

        const groupSnap = await getDoc(groupRef);
        let existingUsers = [];

        if (groupSnap.exists()) {
            existingUsers = groupSnap.data()?.userInfo || [];
        }

        await setDoc(groupRef, {
            userInfo: [...existingUsers, user],
        });

        await setDoc(doc(db, "ActiveTrips", trip_data?.userEmail), {
            tripData: trip_data?.tripData,
            userEmail: user?.email,
            userName: user?.name,
            id: trip_data?.id,
        });
        setLoader(false);
        const group = { member: user?.name, type: groupId }
        localStorage.setItem('group', JSON.stringify(group))
        nav('/');
    }

    return (
        <div className='font-baloo mb-8'>
            <div className='flex gap-4 justify-start items-center'>
                <img
                    src={(photo) ? photo : '/sample.jpg'}
                    className='h-[340px] object-cover rounded-xl'
                />
                <p className='text-3xl font-bold'>🛩️ {trip_data?.tripData?.tripSummary?.destination}</p>
            </div>

            <div className='flex items-center justify-between'>
                <div className='my-5 flex flex-col gap-4'>
                    <div className='flex gap-5'>
                        <p className='py-1 px-3 bg-neutral-200 rounded-full text-neutral-600 border border-neutral-900'>🗓️ Starting Date: {trip_data?.tripData?.tripSummary?.startDate}</p>
                        <p className='py-1 px-3 bg-neutral-200 rounded-full text-neutral-600 border border-neutral-900'>🗓️ Ending Date: {trip_data?.tripData?.tripSummary?.endDate}</p>

                        <p className='py-1 px-3 bg-neutral-200 rounded-full text-neutral-600 border border-neutral-900'>
                            💰 Estimated Cost: {trip_data?.tripData?.tripSummary?.currency} {trip_data?.tripData?.tripSummary?.totalCost}
                        </p>
                    </div>
                </div>


                <div>
                    {
                        (active)
                            ? <div className='px-4 py-2 rounded-lg font-medium text-green-700 font-baloo bg-green-100 border-[2px] border-green-700'>
                                Active
                            </div>

                            : <AlertDialog>
                                <AlertDialogTrigger className='cursor-pointer shadow-md shadow-[rgb(0,0,0,0.6)] bg-neutral-900 px-4 py-2 rounded-lg font-medium text-green-400 font-baloo hover:text-green-200 transition-all duration-300 flex items-center justify-center gap-2'>
                                    {
                                        (loader)
                                            ? <><Loader2 className='animate-spin' /> Please Wait</>
                                            : <>Activate</>
                                    }
                                </AlertDialogTrigger>
                                <AlertDialogContent className='bg-green-50'>

                                    <AlertDialogHeader className='font-baloo'>
                                        <AlertDialogTitle>Join a Group and Travel Together!</AlertDialogTitle>
                                        <AlertDialogDescription className='text-neutral-900 text-[16px]'>
                                            Make trip planning more fun! Join an existing group or create a new one to plan with fellow travelers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>

                                    <AlertDialogFooter className='font-baloo'>
                                        <AlertDialogAction onClick={() => solo()}>Travel Solo</AlertDialogAction>
                                        <AlertDialogAction onClick={() => group()}>Find a Group</AlertDialogAction>
                                        <AlertDialogCancel className='border-[2px]'>Cancel</AlertDialogCancel>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                    }
                </div>
            </div>

            <div className='mt-4 flex items-center gap-4'>
                <p className='font-bold text-xl'>Hotels & Flights Recommendations: </p>

                <Link to='/hotel-recommendation' className='py-1 px-2 border-[2px] border-green-700 rounded-lg font-medium hover:bg-green-700 hover:shadow-[0px_0px_9px_black] hover:text-white transition-all duration-200 bg-green-100 text-neutral-900'>
                    Hotels
                </Link>

                <Link to='/flight-recommendation' className='py-1 px-2 border-[2px] border-green-700 rounded-lg font-medium hover:bg-green-700 hover:shadow-[0px_0px_9px_black] hover:text-white transition-all duration-200 bg-green-100 text-neutral-900'>
                    Flights
                </Link>
            </div>
        </div>
    )
}

export default InfoSection