import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Header from './components/custom/Header'
import Home from './route-pages/Home'
import Preview from './destination-preview/Preview'
import Chatroom from './route-pages/Chatroom'
import Preference from './route-pages/Preference'
import Assistant from './components/custom/Assistant'
import Archive from './route-pages/Archive'
import Blog from './route-pages/Blog'
import { Toaster } from "@/components/ui/sonner"
import Trip_detail from './view-trip/[tripId]/Trip_detail'
import HotelList from './components/Recommendations/HotelList'
import FlightList from './components/Recommendations/FlightList'


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: '/insights',
    element: (
      <>
        <Header />
        <Preview />
      </>
    ),
  },
  {
    path: '/collaboration',
    element: (
      <>
        <Header />
        <Chatroom />
      </>
    ),
  },
  {
    path: '/user-preference',
    element: (
      <>
        <Header />
        <Preference />
      </>
    ),
  },
  {
    path: '/archives',
    element: (
      <>
        <Header />
        <Archive />
      </>
    ),
  },
  {
    path: '/trip-data/:tripId',
    element: (
      <>
        <Header />
        <Trip_detail />
      </>
    ),
  },
  {
    path: '/blog',
    element: (
      <>
        <Header />
        <Blog />
      </>
    ),
  },
  {
    path: '/hotel-recommendation',
    element: (
      <>
        <Header />
        <HotelList />
      </>
    ),
  },
  {
    path: '/flight-recommendation',
    element: (
      <>
        <Header />
        <FlightList />
      </>
    ),
  },
]);



createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
    <Assistant />
    <Toaster />
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
  // </StrictMode>,
)
