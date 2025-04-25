// src/components/FlightList.js
import React, { useEffect, useState } from 'react';
import FlightCard from './FlightCard';
import getFlightData from './flightapi';

const FlightList = () => {
  const [FlightData, setFlightData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFlightData();
      console.log(data);
      setFlightData(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      {FlightData.map((Flight) => (
        <FlightCard key={Flight.HotelBookingCode} flight={Flight} />
      ))}
    </div>
  );
};

export default FlightList;