// src/components/HotelList.js
import React, { useEffect, useState } from 'react';
import HotelCard from './HotelCard';
import getHotelData from './api';

const HotelList = () => {
  const [hotelData, setHotelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHotelData();
      console.log(data);
      setHotelData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {hotelData.map((hotel) => (
        <HotelCard key={hotel.HotelBookingCode} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelList;