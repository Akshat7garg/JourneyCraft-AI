import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { FcGoogle } from 'react-icons/fc'
import { Loader2 } from 'lucide-react'
import { FaPaperPlane } from 'react-icons/fa6'




function OathCheck({ page }) {

    const [loading, setLoading] = useState(false);

    // to make user sign in
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

    // getting basic user details from his google account
    const getUserDetail = async (token) => {
        const response = await axios.get(`${import.meta.env.VITE_GOOGLE_OAUTH_TOKEN_URL}=${token?.access_token}`, {
            headers: {
                Authorization: `Bearer ${token?.access_token}`,
                Accept: 'application/json'
            }
        });

        localStorage.setItem('user', JSON.stringify(response.data));
        setLoading(false);
        window.location.reload();
    }



    return (
        <div className='height flex items-center justify-center gap-4 font-baloo flex-col'>

            <div>
                To access this <span className='font-bold'>{page}</span> feature, you first have to sign in with your Google account.
            </div>

            <Dialog>
                <DialogTrigger className='cursor-pointer py-2 px-4 rounded-xl font-medium font-baloo hover:text-green-200 transition-all duration-300 bg-neutral-900  text-green-500 text-lg'>
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
        </div>
    )
}

export default OathCheck