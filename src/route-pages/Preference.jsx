import React, { useEffect, useState } from 'react'
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "sonner"
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { FcGoogle } from "react-icons/fc"
import { FaPaperPlane } from "react-icons/fa6"
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { ITINERARY_PROMPT } from '@/constants/Constants'
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/database/dbconfig'
import { useNavigate } from 'react-router-dom'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';


/**
 * Preference component:  Allows users to input their trip preferences (destination, dates, budget, etc.)
 * and generates a trip itinerary using a backend AI service.  Requires Google authentication.
 * @returns {JSX.Element} The trip preference input form.
 */


function Preference() {

  // state variables
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [genLoader, setGenLoader] = useState(false);
  const [pushLoader, setPushLoader] = useState(false);
  const [formData, setFormData] = useState([]);
  const trip_route = useNavigate();

  // Get user details from local storage.  Null if not logged in.
  const user = JSON.parse(localStorage.getItem('user'));

  // Google login using react-oauth/googl
  const signin = useGoogleLogin({
    onSuccess: (user_detail) => { // Call getUserDetail on successful login
      getUserDetail(user_detail);
    },
    onError: (error) => {
      setLoading(false);
      toast("Google login failed. Please try again."); //User-friendly error message
      console.error("Google login error:", error); //Log error for debugging
    },
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
   * Updates the formData state with the provided key-value pair.
   * @param {string} key - The key to update.
   * @param {any} value - The value to set.
   */
  const updateData = (key, value) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  // Update formData with return and departure dates
  useEffect(() => { updateData('return', toDate); }, [toDate]);
  useEffect(() => { updateData('departure', fromDate); }, [fromDate]);

  /**
   * Generates a trip itinerary by sending the form data to the backend API.
   * Saves the response to Firestore and navigates to the trip details page.
   */
  const generate_prompt = async () => {
    // Input validation: Check if all required fields are filled.
    if (
      !formData.start || !formData.destination || !formData.departure ||
      !formData.return || !formData.budget || !formData.group ||
      !formData.interest || !formData.style || !formData.activity
    ) {
      toast("Please fill in all the required fields.");
      return;
    }

    setGenLoader(true);
    // Construct the prompt using the form data
    const final_prompt = ITINERARY_PROMPT
      .replace('{starting}', formData.start)
      .replace('{destination}', formData.destination)
      .replace('{start}', format(formData.departure, 'yyyy-MM-dd')) //Format dates
      .replace('{end}', format(formData.return, 'yyyy-MM-dd'))
      .replace('{budget}', formData.budget)
      .replace('{group}', formData.group)
      .replace('{style}', formData.style)
      .replace('{interest}', formData.interest);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/itinerary/plan", {
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
      saveDB(jsonData); // Save the response to Firestore
    }
    catch (error) {
      setGenLoader(false);
      console.error("Error generating itinerary:", error);
      toast("Error generating itinerary. Please try again later.");
    }
  }

  /**
  * Saves the generated itinerary data to Firestore.
  * @param {object} ai_response - The AI-generated itinerary data.
  */
  const saveDB = async (ai_response) => {
    setPushLoader(true);
    try {
      const docId = Date.now().toString(); //Generate unique ID

      await setDoc(doc(db, "AiTrips", docId), {
        userPref: formData,
        tripData: ai_response, // Assuming destination is the relevant data
        userEmail: user?.email,
        userName: user?.name,
        id: docId,
      });
      trip_route('/trip-data/' + docId); // Navigate to the trip details page

    } catch (error) {
      console.error("Error saving data to Firestore:", error);
      toast("Error saving trip data. Please try again.");
    } finally {
      setGenLoader(false);
      setPushLoader(false);
    }
  };

  return (
    // Main container with font and padding styles
    <div className='font-baloo px-24 pt-8'>

      {/* Section 1: Introduction */}
      <div className='pb-8 border-b-4 border-neutral-300'>
        <p className='font-bold text-3xl mb-2'>Personalize Your Itinerary 📝</p>
        <p className='opacity-75'>Tell us what you like, and we'll craft the perfect itinerary tailored just for you. Whether you crave the thrill of adventure-packed days, the serenity of relaxing escapes, or a perfect blend of both, we'll meticulously design a travel plan that aligns with your unique style and interests. Your dream trip is just a few clicks away - let us turn your travel aspirations into an unforgettable reality!</p>
      </div>

      {/* Section 2: Trip Details Input */}
      <div className='border-b-4 border-neutral-300 py-8 flex items-center justify-center w-full'>

        {/* Left side: Starting point and departure date */}
        <div className='h-full border-r-2 pr-20 border-neutral-300'>
          <div className='mb-8'>
            <p className='font-semibold text-lg mb-2'>Where are you starting from? 🏠</p>

            {/* Google Places Autocomplete for starting location */}
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                placeholder: 'Starting Place',
                onChange: (input) => { updateData('start', input?.label) },
                className: 'w-80 shadow-md shadow-[rgb(0,0,0,0.6)] rounded-lg'
              }}
            />
          </div>

          <div>
            <p className='font-semibold text-lg mb-2'>Select the departure date. 📅</p>

            {/* Date picker using Popover and Calendar components */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-80 shadow-md shadow-[rgb(0,0,0,0.6)] justify-start text-left font-normal",
                    !fromDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={setFromDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Right side: Destination and return date */}
        <div className='h-full border-l-2 pl-20 border-neutral-300'>
          <div className='mb-8'>
            <p className='font-semibold text-lg mb-2'>What's your destination? 🌍</p>

            {/* Google Places Autocomplete for destination */}
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                placeholder: 'Destination Place',
                onChange: (input) => { updateData('destination', input?.label) },
                className: 'w-80 shadow-md shadow-[rgb(0,0,0,0.6)] rounded-lg'
              }}
            />
          </div>


          <div>
            <p className='font-semibold text-lg mb-2'>Select the return date. 📅</p>

            {/* Date picker using Popover and Calendar components */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-80 shadow-md shadow-[rgb(0,0,0,0.6)] justify-start text-left font-normal",
                    !toDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={setToDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Section 3: Preferences Input */}
      <div className='w-full flex items-center justify-center border-b-4 border-neutral-300 py-8'>

        {/* Series of Select components for various preferences */}
        <div className='h-full px-8 border-r-2 border-neutral-300'>

          {/* Budget selection */}
          <p className='font-semibold text-lg mb-2'>Travel Budget</p>
          <Select onValueChange={(value) => updateData('budget', value)}>
            <SelectTrigger className="shadow-md shadow-[rgb(0,0,0,0.6)]">
              <SelectValue placeholder="Budget Detail" />
            </SelectTrigger>
            <SelectContent className="font-baloo">
              <SelectGroup>
                <SelectLabel>Budget</SelectLabel>
                <SelectItem value="Economy ($50 - $100 per day)">Economy ($50 - $100 per day)</SelectItem>
                <SelectItem value="Mid-Range ($100 - $300 per day)">Mid-Range ($100 - $300 per day)</SelectItem>
                <SelectItem value="Luxury ($300+ per day)">Luxury ($300+ per day)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Group selection */}
        <div className='h-full px-8 border-r-2 border-l-2 border-neutral-300'>
          <p className='font-semibold text-lg mb-2'>Group Size and Type</p>
          <Select onValueChange={(value) => updateData('group', value)}>
            <SelectTrigger className="shadow-md shadow-[rgb(0,0,0,0.6)]">
              <SelectValue placeholder="Group Size" />
            </SelectTrigger>
            <SelectContent className="font-baloo">
              <SelectGroup>
                <SelectLabel>Group Size</SelectLabel>
                <SelectItem value="solo">Solo</SelectItem>
                <SelectItem value="couple">Couple</SelectItem>
                <SelectItem value="family">Family</SelectItem>
                <SelectItem value="friends">Friends</SelectItem>
                <SelectItem value="large group">Large Group</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Interest selection */}
        <div className='h-full px-8 border-r-2 border-l-2 border-neutral-300'>
          <p className='font-semibold text-lg mb-2'>Destination Interests</p>
          <Select onValueChange={(value) => updateData('interest', value)}>
            <SelectTrigger className="shadow-md shadow-[rgb(0,0,0,0.6)]">
              <SelectValue placeholder="Destination Interest" />
            </SelectTrigger>
            <SelectContent className="font-baloo">
              <SelectGroup>
                <SelectLabel>Interests</SelectLabel>
                <SelectItem value="mountains">Mountains</SelectItem>
                <SelectItem value="beaches">Beaches</SelectItem>
                <SelectItem value="cities">Cities</SelectItem>
                <SelectItem value="nature reserves">Nature Reserves</SelectItem>
                <SelectItem value="theme park">Theme Park</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Style selection */}
        <div className='h-full px-8 border-r-2 border-l-2 border-neutral-300'>
          <p className='font-semibold text-lg mb-2'>Travel Style</p>
          <Select onValueChange={(value) => updateData('style', value)}>
            <SelectTrigger className="shadow-md shadow-[rgb(0,0,0,0.6)]">
              <SelectValue placeholder="Travel Style" />
            </SelectTrigger>
            <SelectContent className="font-baloo">
              <SelectGroup>
                <SelectLabel>Travel Style</SelectLabel>
                <SelectItem value="adventure">Adventure</SelectItem>
                <SelectItem value="relaxation">Relaxation</SelectItem>
                <SelectItem value="cultural exploration">Cultural Exploration</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="culinary">Culinary</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Activity selection */}
        <div className='h-full px-8 border-l-2 border-neutral-300'>
          <p className='font-semibold text-lg mb-2'>Preferred Pace of Travel</p>
          <Select onValueChange={(value) => updateData('activity', value)}>
            <SelectTrigger className="shadow-md shadow-[rgb(0,0,0,0.6)]">
              <SelectValue placeholder="Daily Activity Count" />
            </SelectTrigger>
            <SelectContent className="font-baloo">
              <SelectGroup>
                <SelectLabel>Activity Count</SelectLabel>
                <SelectItem value="Relaxed (1-2 activities per day)">Relaxed (1-2 activities per day)</SelectItem>
                <SelectItem value="Moderate (3-4 activities per day)">Moderate (3-4 activities per day)</SelectItem>
                <SelectItem value="Packed (5+ activities per day)">Packed (5+ activities per day)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Section 4: Generate Trip Button */}
      <div className='flex items-center justify-end pt-6'>

        {/* Conditional rendering of button based on user authentication status */}
        {(user) ?
          <>
            {(genLoader) ?

              //Loader while generating
              <>
                <div className='font-bold text-xl text-green-500 w-full flex items-center justify-center gap-4'>
                  <Loader2 className="animate-spin" />
                  <span className='text-neutral-900'>
                    {(pushLoader)
                      ? 'Saving itinerary to database'
                      : 'Please wait, our AI Model is generating the result'}
                  </span>
                </div>
              </>

              :

              <button onClick={() => generate_prompt()} className='cursor-pointer shadow-md shadow-[rgb(0,0,0,0.6)] bg-neutral-900 h-full px-4 py-2 rounded-lg font-medium text-green-400 font-baloo hover:text-green-200 transition-all duration-300'>
                Generate Trip
              </button>}
          </>

          :

          // Login Dialog if not logged in
          <>
            <Dialog>
              <DialogTrigger className='cursor-pointer shadow-md shadow-[rgb(0,0,0,0.6)] bg-neutral-900 h-full px-4 py-2 rounded-lg font-medium text-green-400 font-baloo hover:text-green-200 transition-all duration-300'>
                Generate Trip
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
                  <button onClick={signin} className='cursor-pointer bg-neutral-900 py-2 w-full rounded-xl font-medium text-green-500 text-lg flex items-center justify-center gap-4 hover:text-green-200 transition-all duration-300'>
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
          </>
        }
      </div>

    </div>
  )
}

export default Preference