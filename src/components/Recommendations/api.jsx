import React, { useEffect, useState } from 'react';
import axios from 'axios';



const apiUrl = 'http://api.tbotechnology.in/TBOHolidays_HotelAPI/HotelSearch';
const username = 'hackathontest';
const password = 'Hac@98910186';

// Create a base64-encoded string for Basic Authentication
const authHeader = 'Basic ' + btoa(username + ':' + password);

// Your request payload (data to be sent in the POST request body)
const requestData = {
    "CheckIn": "2024-01-27",
    "CheckOut": "2024-01-29",
    "HotelCodes": "1402689,1405349,1405355,1407362,1413911,1414353,1415021,1415135,1415356,1415518,1415792,1416419,1416455,1416461,1416726,1440549,1440646,1440710,1440886,1440924,1441027,1441035,1441155,1441982,1442124,1443452,1443686,1447419,1448073,1450393,1450771,1450910,1450927,1450928,1451558,1452394,1452622,1452663,1453490,1457003,1457080,1457487,1457578,1457885,1458286,1458386,1458544,1458641,1459770,1463960,1463986,1464370,1464612,1465220,1465563,1465616,1465788,1466296,1466820,1466843,1467053,1467113,1468099,1469699,1469700,1469706,1472429,1474785,1475148,1475152,1479473,1479485,1482733,1482841,1482863,1483807,1484226,1485439,1487994,1490420,1491113,1491115,1491121,1491171,1491329,1491342,1491346,1491350,1491354,1491355,1491912,1492068,1492074,1492276,1492293,1492323,1493583,1493627,1493630,1493733",
    "CityCode": "115936",
    "GuestNationality": "AE",
    "PreferredCurrencyCode": "AED",
    "PaxRooms": [
        {
            "Adults": 1,
            "Children": 2,
            "ChildrenAges": [
                1,
                16
            ]
        },
        {
            "Adults": 1,
            "Children": 0,
            "ChildrenAges": [
                1
            ]
        }
    ],
    "IsDetailResponse": true,
    "ResponseTime": 23,
    "Filters": {
        "MealType": "All",
        "Refundable": "true",
        "NoOfRooms": 0
    }
};

const getHotelData = async () => {

    // Send a POST request with authentication
    // axios.post(apiUrl, requestData, {
    //   headers: {
    //     'Authorization': authHeader,
    //     'Content-Type': 'application/json', // Adjust the content type based on your API's requirements
    //   },
    // })
    //   .then(response => {
        
    //     // Handle the successful response
    //     console.log('Response:', response.data);
    //     return response.data.HotelSearchResults;
    //   })
    //   .catch(error => {
    //     // Handle errors
    //     console.error('Error:', error.message);
    //     return [];
    //   });

    const hresp = {
        "Status": {
            "Code": 200,
            "Description": "Successful"
        },
        "HotelSearchResults": [
            {
                "HotelBookingCode": "1453490!TB!c1ea0efb-a407-47b6-a030-44ceabb3da32",
                "HotelInfo": {
                    "HotelCode": 1453490,
                    "HotelName": "Northfields Hostel",
                    "HotelPicture": "https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5tIwp36az0QAsth5hAx4t1MqZZIR/MSrXQY0gw6hPzBkTb0w5aJ+8RX4DFNHFvif8bCvUzDpu+A4=",
                    "HotelDescription": "Property Location With a stay at Northfields Hostel in London (Ealing), you''ll be within a 15-minute drive of Griffin Park Stadium and Royal Botanic Gardens, Kew.  This hostel is 6.2 m ",
                    "Latitude": "51.49893",
                    "Longitude": "-0.31444",
                    "HotelAddress": "Northfield Avenue Northfield Avenue Brentford W5 4UB ",
                    "Rating": "TwoStar",
                    "TagIds": "56188"
                },
                "MinHotelPrice": {
                    "TotalPrice": 542.55,
                    "Currency": "USD",
                    "OriginalPrice": 542.55
                },
                "IsPkgProperty": false,
                "IsPackageRate": true,
                "MappedHotel": false,
                "IsHalal": false
            },
            {
                "HotelBookingCode": "1443452!TB!c1ea0efb-a407-47b6-a030-44ceabb3da32",
                "HotelInfo": {
                    "HotelCode": 1443452,
                    "HotelName": "The Captain Cook Hotel",
                    "HotelPicture": "https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5lPqBj/Ape0/QCIe+Q6uhRZedb5I4I2bwDX/sD4jGLFFnv/SOa8cGjDCr3bWFRwUZQL4weduocRzKciwlfS1u4A==",
                    "HotelDescription": "Property Location With a stay at The Captain Cook Hotel in London (Hammersmith and Fulham), you''ll be within a 10-minute drive of Craven Cottage Stadium and Stamford Bridge Stadium.  T ",
                    "Latitude": "51.48124",
                    "Longitude": "-0.20985",
                    "HotelAddress": "203-205 Dawes Road Fulham ",
                    "Rating": "ThreeStar",
                    "TripAdvisorRating": "5.0",
                    "TagIds": "56161,56142"
                },
                "MinHotelPrice": {
                    "TotalPrice": 620.58,
                    "Currency": "USD",
                    "OriginalPrice": 620.58
                },
                "IsPkgProperty": false,
                "IsPackageRate": true,
                "MappedHotel": false,
                "IsHalal": false
            },
            {
                "HotelBookingCode": "1493630!TB!c1ea0efb-a407-47b6-a030-44ceabb3da32",
                "HotelInfo": {
                    "HotelCode": 1493630,
                    "HotelName": "Morgan Hotel",
                    "HotelPicture": "https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5lPqBj/Ape0/JZxZg/TNMwMZSuwO+eyNU0N7pN70mZjlH5Bbwbj9FWzssvbfkaYOA8orr3ViYxHNE2FFxI7kDfQ==",
                    "HotelDescription": "Property Location With a stay at Morgan Hotel in London (Bloomsbury), you''ll be steps from The British Museum and 9 minutes by foot from University of London.  This hotel is 0.5 mi (0. ",
                    "Latitude": "51.51804",
                    "Longitude": "-0.12782",
                    "HotelAddress": "Bloomsbury Street London WC1B 3QJ ",
                    "Rating": "ThreeStar",
                    "TagIds": "56157,56169"
                },
                "MinHotelPrice": {
                    "TotalPrice": 668.37,
                    "Currency": "USD",
                    "OriginalPrice": 668.37
                },
                "IsPkgProperty": false,
                "IsPackageRate": true,
                "MappedHotel": false,
                "IsHalal": false
            },
            {
                "HotelBookingCode": "1450927!TB!c1ea0efb-a407-47b6-a030-44ceabb3da32",
                "HotelInfo": {
                    "HotelCode": 1450927,
                    "HotelName": "Lyall Apartment Hotel",
                    "HotelPicture": "https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5lPqBj/Ape09uy1OjbQd1rv/HwfdBZKfZFetB+B47xwnkxqkOpOmjLzSniflhQ3Wav8dX2a7Tz6SkY2c47k6ihw==",
                    "HotelDescription": "Property Location With a stay at Lyall Apartment Hotel in London (Lewisham), you''ll be within a 15-minute drive of Greenwich Park and Royal Observatory.  This aparthotel is 5.6 mi (9 k ",
                    "Latitude": "51.44799",
                    "Longitude": "-0.00098",
                    "HotelAddress": "256 Hither Green Lane Lewisham  SE13 6TT ",
                    "Rating": "ThreeStar",
                    "TripAdvisorRating": "4.0",
                    "TagIds": "56230"
                },
                "MinHotelPrice": {
                    "TotalPrice": 676.08,
                    "Currency": "USD",
                    "OriginalPrice": 676.08
                },
                "IsPkgProperty": false,
                "IsPackageRate": true,
                "MappedHotel": false,
                "IsHalal": false
            },
            {
                "HotelBookingCode": "1463986!TB!c1ea0efb-a407-47b6-a030-44ceabb3da32",
                "HotelInfo": {
                    "HotelCode": 1463986,
                    "HotelName": "SACO St Pauls - Red Lion Court",
                    "HotelPicture": "https://api.tbotechnology.in/imageresource.aspx?img=FbrGPTrju5e5v0qrAGTD8pPBsj8/wYA5lPqBj/Ape0+Hf/or2ZERszwhIoORJKzKzfF2YpakN1+yxJPAVUhLSssBBWCk8K346VsqQJYbMgtfKbwzlRoTqQ==",
                    "HotelDescription": "Property Location Located in London (The City of London), SACO St Pauls - Red Lion Court is within a 10-minute walk of St. Paul''s Cathedral and London Stock Exchange.  This 4-star apar ",
                    "Latitude": "51.51466",
                    "Longitude": "-0.10891",
                    "HotelAddress": "9 Red Lion Court London EC4A 3EF ",
                    "Rating": "FourStar",
                    "TripAdvisorRating": "4.0",
                    "TagIds": "56186"
                },
                "MinHotelPrice": {
                    "TotalPrice": 1174.03,
                    "Currency": "USD",
                    "OriginalPrice": 1174.03
                },
                "IsPkgProperty": false,
                "IsPackageRate": true,
                "MappedHotel": false,
                "IsHalal": false
            },
            {
                "HotelBookingCode": "1492068!TB!c1ea0efb-a407-47b6-a030-44ceabb3da32",
                "HotelInfo": {
                    "HotelCode": 1492068,
                    "HotelName": "Mayfair House",
                    "HotelPicture": "https://api.tbotechnology.in/imageresource.aspx?img=9eMP+0FIICgCIk6ZClzZH9Cs+1gwAq6BFWcc22yNLMF/UJIXMdxPdc/YiM5ymb8RUoXOV3nj4TmNZx4U/Ngh2vHtiPfHhQZTELfwIfGSHVo=",
                    "HotelDescription": "Property Location Located in London (City of Westminster), Mayfair House is within a 15-minute walk of Buckingham Palace and St. James Park.  This 5-star apartment is 0.7 mi (1.1 km) f ",
                    "Latitude": "51.50607",
                    "Longitude": "-0.14797",
                    "HotelAddress": "22-28 Shepherd Street Mayfair ",
                    "Rating": "FiveStar",
                    "TagIds": "56174,56158"
                },
                "MinHotelPrice": {
                    "TotalPrice": 1517.38,
                    "Currency": "USD",
                    "OriginalPrice": 1517.38
                },
                "IsPkgProperty": false,
                "IsPackageRate": true,
                "MappedHotel": false,
                "IsHalal": false
            },
            {
                "HotelBookingCode": "1407362!TB!c1ea0efb-a407-47b6-a030-44ceabb3da32",
                "HotelInfo": {
                    "HotelCode": 1407362,
                    "HotelName": "Ham Yard Hotel",
                    "HotelPicture": "https://api.tbotechnology.in/imageresource.aspx?img=9eMP+0FIICgCIk6ZClzZH9Cs+1gwAq6BFWcc22yNLMF/UJIXMdxPdfIkhJWzpusxoTXdWFf9oO3S9sqld6lSuOCzMp7ATLQlklEn1ls0Td8=",
                    "HotelDescription": "Property Location With a stay at Ham Yard Hotel, Firmdale Hotels, you''ll be centrally located in London, steps from Piccadilly Circus and 5 minutes by foot from Leicester Square.  This ",
                    "Latitude": "51.51137",
                    "Longitude": "-0.13437",
                    "HotelAddress": "1 Ham Yard London W1D 7DT ",
                    "Rating": "FiveStar",
                    "TripAdvisorRating": "4.5",
                    "TagIds": "56176,56184,56158"
                },
                "MinHotelPrice": {
                    "TotalPrice": 4105.89,
                    "Currency": "USD",
                    "OriginalPrice": 4105.89
                },
                "IsPkgProperty": false,
                "IsPackageRate": true,
                "MappedHotel": false,
                "IsHalal": false
            }
        ]
    };
    
    return hresp.HotelSearchResults;
}

export default getHotelData;