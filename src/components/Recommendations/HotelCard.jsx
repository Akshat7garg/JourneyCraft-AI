// src/components/HotelCard.js
import React from 'react';
import './HotelCard.css'; // Import the CSS file for styling

const getReadableRating = (rating) => {
    switch (rating) {
      case 'TwoStar':
        return 2;
      case 'ThreeStar':
        return 3;
      case 'FourStar':
        return 4;
      case 'FiveStar':
        return 5;
      default:
        return 'Not Rated';
    }
  };

  const redirectToPage = (url) => {
    window.open(url, '_blank')
  }

const HotelCard = ({ hotel }) => {
  // Helper function to convert numeric rating to stars
  const renderStars = (rating) => {
    console.log(rating)
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<span key={i} className="star" style={{ color: 'gold' }}>&#9733;</span>);
    }
    
    if (halfStar) {
        stars.push(<span key="half" className="star" style={{ color: 'gold' }}>&#9733;&#189;</span>);
    }

    return stars;
  };

  return (
    <div className="hotel-card">
      <div className="hotel-image">
        <img src={hotel.HotelInfo.HotelPicture} alt={hotel.HotelInfo.HotelName} />
      </div>
      <div className="hotel-details">
        <h2>{hotel.HotelInfo.HotelName}</h2>
        <p>{hotel.HotelInfo.HotelAddress}</p>
        <p><strong>Rating:</strong> {renderStars(getReadableRating(hotel.HotelInfo.Rating))}</p>
      </div>
      <div style={{marginTop: '55px', marginRight: '40%', fontSize: '20px' }}>
            <button className='directions' onClick={() => redirectToPage(`https://www.google.com/maps?q=${hotel.HotelInfo.Latitude},${hotel.HotelInfo.Longitude}`)}>
              Directions
            </button>
      </div>
      <div style={{marginTop: '35px', marginRight: '50px', fontSize: '20px' }}>
            <p><strong>{hotel.MinHotelPrice.TotalPrice} $ </strong></p>
      </div>
      <div style={{marginTop: '50px', marginRight: '50px'}}>
        <button className="book-now-button">Book</button>
      </div>
    </div>
  );
};

export default HotelCard;