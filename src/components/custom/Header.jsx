import React, { useState } from 'react'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { FaPaperPlane } from "react-icons/fa6"
import { FiBell } from "react-icons/fi"
import { NavLink, Link } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc"
import { CiLogout } from "react-icons/ci"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
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
import { Loader2 } from "lucide-react"


/**
 * Header component for the application. Handles user authentication and navigation.
 * Uses a combination of React components and UI library components.
 */


function Header() {

    const [loading, setLoading] = useState(false);

    // Retrieve user data from local storage. Null if not logged in.
    const user = JSON.parse(localStorage.getItem('user'));

    /**
     * Handles Google Sign-in. Retrieves user details after successfull authentication.
     */
    const signin = useGoogleLogin({
        onSuccess: (user_detail) => {
            setLoading(true);
            getUserDetail(user_detail);
        },
        onError: (error) => {
            setLoading(false);
            alert('Something went wrong. Try again');
        }
    });

    /**
   * Fetches user details from Google's OAuth API using the access token.
   * Stores the user details in local storage and reloads the page.
   * @param {object} token - The Google OAuth token object.
   */
    const getUserDetail = async (token) => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_GOOGLE_OAUTH_TOKEN_URL}=${token?.access_token}`, {
                headers: {
                    Authorization: `Bearer ${token?.access_token}`,
                    Accept: 'application/json', //Correct content type
                },
            });
            localStorage.setItem('user', JSON.stringify(response.data));
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setLoading(false);
            toast("Error fetching user details. Please try again.");
            console.error("Error fetching user details:", error);
        }
    };

    /**
     * Handles Google Sign-out. Clears local storage and reloads the page.
     */
    const signout = () => {
        googleLogout();
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className='h-14 w-full flex justify-between items-center px-8 py-2 bg-neutral-900 sticky top-0 z-50 font-baloo'>

            {/* Left side */}
            <div className='flex items-center gap-2'>
                <FaPaperPlane className='text-2xl text-green-500' />
                <span className='text-xl font-bold text-white'>JourneyCraft AI</span>
            </div>

            {/* Navigation links */}
            <div className='flex h-full items-center gap-2 text-white'>
                <NavLink to='/' className={(e) => { return e.isActive ? 'active' : 'h-link' }}>Home</NavLink>
                <NavLink to='/blog' className={(e) => { return e.isActive ? 'active' : 'h-link' }}>Blog</NavLink>
                <NavLink to='/archives' className={(e) => { return e.isActive ? 'active' : 'h-link' }}>Archives</NavLink>

                <NavLink to='/user-preference' className={(e) => { return e.isActive ? 'btn-link bg-green-700 text-white' : 'btn-link bg-green-50 text-neutral-900' }}>
                    <span className='h-5 w-5 flex items-center justify-center rounded-full bg-green-700 text-white text-xl'>+</span>
                    New Trip
                </NavLink>
            </div>

            {/* Right side */}
            <div className='flex items-center gap-4 h-full'>
                {
                    // Conditional rendering based on login status
                    (user) ?

                        // Logged-in user UI
                        <div className='flex items-center gap-4 h-full'>

                            {/* For notifications */}
                            <Link to='/collaboration' className='cursor-pointer border-[3px] border-green-700 bg-green-50 text-green-700 text-xl h-10 w-10 rounded-full flex justify-center items-center hover:bg-green-700 hover:text-white transition-all duration-200'>
                                <FiBell />
                            </Link>

                            {/* user's profile */}
                            <Popover>
                                <PopoverTrigger>
                                    <img src={user?.picture} className='h-10 w-10 rounded-full cursor-pointer' />
                                </PopoverTrigger>
                                <PopoverContent className='w-fit mr-8 py-2 px-4 flex items-center justify-center flex-col gap-2'>
                                    <div className='font-baloo font-bold pb-2 border-b-2'>{user?.name}</div>

                                    {/* Dialog box if user wants to log out */}
                                    <AlertDialog>
                                        <AlertDialogTrigger className="flex font-baloo items-center justify-center gap-2 cursor-pointer">
                                            Logout
                                            <CiLogout className='text-2xl' />
                                        </AlertDialogTrigger>
                                        <AlertDialogContent className='bg-green-50'>

                                            <AlertDialogHeader className='font-baloo'>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription className='text-neutral-900 text-[16px]'>
                                                    You will be logged out from your account, and any unsaved changes may be lost. Do you want to continue?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>

                                            <AlertDialogFooter className='font-baloo'>
                                                <AlertDialogCancel className='border-[2px]'>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => signout()}>Logout</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>

                                </PopoverContent>
                            </Popover>

                        </div>

                        :

                        // Not logged-in user UI
                        // Dialog box if the user wants to sign in
                        <Dialog>
                            <DialogTrigger className='cursor-pointer bg-green-700 h-full px-4 rounded-xl font-medium text-white font-baloo hover:text-green-200 transition-all duration-300'>
                                Sign in
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-green-50 font-baloo">

                                <DialogHeader>
                                    <DialogTitle className='flex items-center justify-center gap-2'>
                                        <FaPaperPlane className='text-2xl' />
                                        <span className='text-xl font-bold'>JourneyCraft AI</span>
                                    </DialogTitle>
                                </DialogHeader>

                                <div>
                                    <div className='flex items-center gap-2 mb-2'>
                                        <FcGoogle className='h-6 w-6' />
                                        <h2 className='text-lg font-medium'>Sign in with Google</h2>
                                    </div>
                                    <p className=' text-justify'>Use your Google account to securely access our JourneyCraft AI. Your data is secure and used only to enhance your experience.</p>
                                </div>

                                <DialogFooter>
                                    <button onClick={() => signin()} className='cursor-pointer bg-neutral-900 py-2 w-full rounded-xl font-medium text-green-500 text-lg flex items-center justify-center gap-4 hover:text-green-200 transition-all duration-300'>
                                        {
                                            (loading) ?
                                                <>
                                                    <Loader2 className="animate-spin" />
                                                    Please wait
                                                </>
                                                :
                                                <>Sign in</>
                                        }
                                    </button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                }

            </div>
        </div>
    )
}

export default Header