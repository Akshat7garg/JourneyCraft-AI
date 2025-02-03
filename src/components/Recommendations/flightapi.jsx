import React, { useEffect, useState } from 'react';
import axios from 'axios';



const apiUrl = 'http://api.tbotechnology.in/TBOHolidays_HotelAPI/HotelSearch';
const username = 'hackathontest';
const password = 'Hac@498910186';

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

const getflightData = async () => {

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
                "AirlineInfo": {
                    "HotelCode": 1453490,
                    "AirlineName": "Cathay Pacific",
                    "AirlinePicture": "https://download.logo.wine/logo/Cathay_Pacific/Cathay_Pacific-Logo.wine.png",
                    "HotelDescription": "Property Location With a stay at Northfields Hostel in London (Ealing), you''ll be within a 15-minute drive of Griffin Park Stadium and Royal Botanic Gardens, Kew.  This hostel is 6.2 m ",
                    "From": "Delhi",
                    "To": "Kona",
                    "FromTime": "04:00 AM",
                    "ToTime": "12:58 PM",
                    "Duration": "24h 28m",
                    "Via": "1 Stop(via San Fransisco)",
                    "Meals": "1",
                    "IFE": "1",
                    "Wifi": "1",
                    "HotelAddress": "Northfield Avenue Northfield Avenue Brentford W5 4UB ",
                    "Rating": "TwoStar",
                    "TagIds": "56188"
                },
                "MinHotelPrice": {
                    "TotalPrice": 1252.55,
                    "Currency": "USD",
                    "OriginalPrice": 1252.55
                },
                "IsPkgProperty": false,
                "IsPackageRate": true,
                "MappedHotel": false,
                "IsHalal": false
            },
            {
                "HotelBookingCode": "1453490!TB!c1ea0efb-a407-47b6-a030-44ceabb3da32",
                "AirlineInfo": {
                    "HotelCode": 1453490,
                    "AirlineName": "Cathay Pacific",
                    "AirlinePicture": "https://download.logo.wine/logo/Cathay_Pacific/Cathay_Pacific-Logo.wine.png",
                    "HotelDescription": "Property Location With a stay at Northfields Hostel in London (Ealing), you''ll be within a 15-minute drive of Griffin Park Stadium and Royal Botanic Gardens, Kew.  This hostel is 6.2 m ",
                    "From": "Delhi",
                    "To": "Kona",
                    "FromTime": "01:30 AM",
                    "ToTime": "11:50 PM",
                    "Duration": "24h 28m",
                    "Via": "2 Stop(via Hong Kong, Tokyo)",
                    "Meals": "1",
                    "IFE": "1",
                    "Wifi": "0",
                    "HotelAddress": "Northfield Avenue Northfield Avenue Brentford W5 4UB ",
                    "Rating": "TwoStar",
                    "TagIds": "56188"
                },
                "MinHotelPrice": {
                    "TotalPrice": 1257.55,
                    "Currency": "USD",
                    "OriginalPrice": 1257.55
                },
                "IsPkgProperty": false,
                "IsPackageRate": true,
                "MappedHotel": false,
                "IsHalal": false
            },
            {
                "HotelBookingCode": "1493630!TB!c1ea0efb-a407-47b6-a030-44ceabb3da32",
                "AirlineInfo": {
                    "HotelCode": 1453490,
                    "AirlineName": "Japan Airlines",
                    "AirlinePicture": "https://1000logos.net/wp-content/uploads/2021/04/Japan-Airlines-logo.png",
                    "HotelDescription": "Property Location With a stay at Northfields Hostel in London (Ealing), you''ll be within a 15-minute drive of Griffin Park Stadium and Royal Botanic Gardens, Kew.  This hostel is 6.2 m ",
                    "From": "Delhi",
                    "To": "Kona",
                    "FromTime": "17:55 PM",
                    "ToTime": "12:04 PM",
                    "Duration": "31h 10m",
                    "Via": "1 Stop(via Tokyo Haneda)",
                    "Meals": "1",
                    "IFE": "1",
                    "Wifi": "1",
                    "HotelAddress": "Northfield Avenue Northfield Avenue Brentford W5 4UB ",
                    "Rating": "TwoStar",
                    "TagIds": "56188"
                },
                "MinHotelPrice": {
                    "TotalPrice": 1009.37,
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
                "AirlineInfo": {
                    "HotelCode": 1453490,
                    "AirlineName": "ANA",
                    "AirlinePicture": "https://1.bp.blogspot.com/-qUS6dV_zmM0/WbD4EmeEqwI/AAAAAAAAJCc/-JuRsS8AIuYwO8YH0x_HBAI6TPVPRa7kgCLcBGAs/s1600/all-nippon-airways.jpg",
                    "HotelDescription": "Property Location With a stay at Northfields Hostel in London (Ealing), you''ll be within a 15-minute drive of Griffin Park Stadium and Royal Botanic Gardens, Kew.  This hostel is 6.2 m ",
                    "From": "Delhi",
                    "To": "Honolulu",
                    "FromTime": "18:55 PM",
                    "ToTime": "10:05 PM",
                    "Duration": "30h 40m",
                    "Via": "1 Stop(via Tokyo Haneda)",
                    "Meals": "1",
                    "IFE": "1",
                    "Wifi": "1",
                    "HotelAddress": "Northfield Avenue Northfield Avenue Brentford W5 4UB ",
                    "Rating": "TwoStar",
                    "TagIds": "56188"
                },
                "MinHotelPrice": {
                    "TotalPrice": 1242.08,
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
                "AirlineInfo": {
                    "HotelCode": 1453490,
                    "AirlineName": "Korean Air",
                    "AirlinePicture": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Korean_Air_Taegeuk.svg/2048px-Korean_Air_Taegeuk.svg.png",
                    "HotelDescription": "Property Location With a stay at Northfields Hostel in London (Ealing), you''ll be within a 15-minute drive of Griffin Park Stadium and Royal Botanic Gardens, Kew.  This hostel is 6.2 m ",
                    "From": "Delhi",
                    "To": "Honolulu",
                    "FromTime": "19:40 AM",
                    "ToTime": "9:30 AM",
                    "Duration": "29h 20m",
                    "Via": "1 Stop(via Seoul-Incheon)",
                    "Meals": "1",
                    "IFE": "1",
                    "Wifi": "0",
                    "HotelAddress": "Northfield Avenue Northfield Avenue Brentford W5 4UB ",
                    "Rating": "TwoStar",
                    "TagIds": "56188"
                },
                "MinHotelPrice": {
                    "TotalPrice": 893.03,
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
                "AirlineInfo": {
                    "HotelCode": 1453490,
                    "AirlineName": "Air France",
                    "AirlinePicture": "https://www.webwire.com/prmedia/8/278218/278218-1.png?20231229233421",
                    "HotelDescription": "Property Location With a stay at Northfields Hostel in London (Ealing), you''ll be within a 15-minute drive of Griffin Park Stadium and Royal Botanic Gardens, Kew.  This hostel is 6.2 m ",
                    "From": "Delhi",
                    "To": "Kahului",
                    "FromTime": "01:45 AM",
                    "ToTime": "17:56 PM",
                    "Duration": "31h 41m",
                    "Via": "2 Stop(via Paris, Seattle)",
                    "Meals": "1",
                    "IFE": "1",
                    "Wifi": "1",
                    "HotelAddress": "Northfield Avenue Northfield Avenue Brentford W5 4UB ",
                    "Rating": "TwoStar",
                    "TagIds": "56188"
                },
                "MinHotelPrice": {
                    "TotalPrice": 973.38,
                    "Currency": "USD",
                    "OriginalPrice": 1517.38
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

export default getflightData;