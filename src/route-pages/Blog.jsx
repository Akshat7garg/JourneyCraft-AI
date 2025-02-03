import React from 'react'
import { Link } from 'react-router-dom'


/**
 * Blog component displaying information about JourneyCraft AI.
 * Includes sections for introduction, features, call to action, credits, and developer information.
 */


function Blog() {
  return (
    // Main container with padding and font styles
    <div className='px-40 py-8 font-baloo font-medium'>

      {/* Title of the blog */}
      <div className='font-extrabold text-3xl mb-8'>Welcome to the JourneyCraft AI Blog!</div>

      {/* Section 1: Introduction */}
      <div className='pb-8 border-b-4 border-neutral-300'>
        <p className='font-bold text-xl mb-2 mt-8'>Your Ultimate Travel Companion</p>
        <p className='opacity-75'>At JourneyCraft AI, we believe that travel planning should be seamless, exciting, and hassle-free. Our blog is dedicated to bringing you the latest trends, expert travel insights, and innovative features of our AI-powered itinerary planner.</p>
      </div>

      {/* Section 2: Features */}
      <div className='pb-8 border-b-4 border-neutral-300'>
        <p className='font-bold text-xl mb-2 mt-8'>What You'll Find Here:</p>

        <p>🗺 <span className='opacity-75'>Travel Planning Tips & Tricks - Get expert advice on crafting the perfect itinerary with ease.</span></p>
        <p>🤖 <span className='opacity-75'>AI-Powered Travel Innovation - Explore how AI is transforming the way we plan trips.</span></p>
        <p>🌍 <span className='opacity-75'>Destination Spotlights - Discover hidden gems, must-visit attractions, and curated travel experiences.</span></p>
        <p>👥 <span className='opacity-75'>Group Travel Made Easy - Learn how to plan trips collaboratively with real-time tools.</span></p>
        <p>💡 <span className='opacity-75'>User Stories & Updates - Stay updated with new features, user experiences, and platform improvements.</span></p>
      </div>

      {/* Section 3: Call to Action */}
      <div className='pb-8 border-b-4 border-neutral-300'>
        <p className='font-bold text-xl mb-2 mt-8'>Join the Journey!</p>
        <p className='opacity-75 mb-4'>Our goal is to simplify travel for solo adventurers and groups alike. Stay tuned for exciting updates, and let JourneyCraft AI help you craft unforgettable travel experiences!</p>
        <Link to='/user-preference' className='py-1 px-2 border-[2px] border-green-700 rounded-lg font-medium hover:bg-green-700 hover:shadow-[0px_0px_9px_black] hover:text-white transition-all duration-200 bg-green-100 text-neutral-900'>
          🚀 Start exploring now!
        </Link>
      </div>

      {/* Section 4: Credits and Acknowledgements */}
      <div className='font-bold text-xl mt-8 my-2'>Credits & Acknowledgments</div>

      {/* Section with bottom border */}
      <div className='pb-8 border-b-4 border-neutral-300'>
        <p className='opacity-75 mb-3'>This project was built as part of <span className='font-extrabold'>VoyageHack 2.0</span>, organized by <span className='font-extrabold'>TBO.com</span>. We appreciate their support and the opportunity to innovate in the travel tech space.</p>
        <div>
          <span className='mr-1'>🔗 Source Code:</span>
          <Link to='https://github.com/Nishu-18/JourneyCraftAI' target='_blank' className='opacity-75'>https://github.com/Nishu-18/JourneyCraftAI</Link>
        </div>
      </div>

      {/* Section 5: Developer Information */}
      <p className='font-bold text-xl mb-4 mt-8'>Developers Behind JourneyCraft AI</p>
      <div className='flex justify-start gap-24'>

        <div>
          <p>👨‍💻 Nishchal Bhardwaj</p>
          <p>🔗 GitHub: <Link to='https://github.com/Nishu-18' target='_blank' className='opacity-75'>https://github.com/Nishu-18</Link></p>
          <p>📧 Email: <span className='opacity-75'>nishchalbhardwaj2004@gmail.com</span></p>
        </div>

        <div>
          <p>👨‍💻 Akshat Garg</p>
          <p>🔗 GitHub: <Link to='https://github.com/Akshat7garg' target='_blank' className='opacity-75'>https://github.com/Akshat7garg</Link></p>
          <p>📧 Email: <span className='opacity-75'>akshat7garg@gmail.com</span></p>
        </div>
      </div>
    </div>
  )
}

export default Blog