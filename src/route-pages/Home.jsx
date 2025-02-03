import React from 'react'
import tbo from '../assets/tbo.png'
import hackathon from '../assets/hackathon.png'
import { home_cards } from '@/constants/Constants'
import { NavLink } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";


/**
 * Home page component. Displays introductory content and featured travel functionalities.
 * Uses Tailwind CSS for styling.
 */


function Home() {

  return (
    <div className='bg-image font-baloo'>

      {/* Hero section: A visually appealing introduction to the application */}
      <div className='flex items-center justify-between py-8 px-24'>
        <div className='flex justify-center gap-2 flex-col w-1/2 text-white text-shadow'>
          <span className='text-4xl font-extrabold'>Welcome to Your Ultimate Travel Companion! ✈️</span>
          <span className='opacity-75 font-semibold text-lg'>Discover destinations, collaborate in real time, and create unforgettable itineraries effortlessly with our virtual travel assistant!</span>
        </div>

        <div className='flex items-center justify-center flex-col gap-4'>
          <img src={tbo} alt="" className='h-20 img-shadow bg-white/10 p-2 rounded-lg' />
          <img src={hackathon} alt="" className='h-44 img-shadow' />
        </div>
      </div>

      {/* Features section: Highlight key app features with interactive cards */}
      <div className='flex items-center justify-center gap-12 py-3'>
        <div className='flex flex-col justify-center items-center tracking-wide h-64 text-white font-extrabold text-4xl'>
          What We Offer
          <FaArrowRight />
        </div>

        {/* Feature card container */}
        <div className='flex items-center justify-center gap-12 h-56'>

          {/* Dynamically renders feature cards from home_cards data */}
          {home_cards.map((item, index) => {
            return <div key={index} className='h-full w-48 bg-white rounded-xl overflow-hidden flex flex-col shadow-[9px_9px_9px_rgb(0,0,0,0.3)]'>

              {/* Content of feature card */}
              <div className='w-full bg-green-500 py-6 px-2 font-bold text-neutral-900 relative flex flex-col items-center justify-center'>
                <span className='text-lg text-center'>{item.title}</span>
                <span className='absolute bottom-0 translate-y-1/2 text-4xl text-shadow w-full text-center backdrop-blur-sm'>{item.icon}</span>
              </div>
              <div className='py-4 px-2 flex items-center h-full justify-between flex-col'>
                <span className='text-sm font-medium text-justify px-3 pt-2'>{item.description}</span>
                <NavLink to={item.link_path} className='py-1 px-2 border-[2px] border-green-700 rounded-lg font-medium hover:bg-green-700 hover:shadow-[0px_0px_9px_black] hover:text-white transition-all duration-200 bg-green-50 text-neutral-900'>{item.link_text}</NavLink>
              </div>
            </div>
          })}
        </div>
      </div>

    </div>
  )
}

export default Home