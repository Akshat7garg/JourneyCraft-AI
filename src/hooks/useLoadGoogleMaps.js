import React, { useEffect, useState } from 'react'

function useLoadGoogleMaps() {

    const apiKey = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
    const [isLoad, setIsLoad] = useState(false);

    useEffect(()=> {
        if (window.google && window.google.maps) {
            setIsLoad(true);
            return;
        }

        const script = document.createElement("script");
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDtyHzZsm5lEgXkUuIwAbwdWsNVxt3o1oU&libraries=places';
        script.async = true;
        script.defer = true;
        script.onload = ()=> setIsLoad(true);
        script.onerror = ()=> console.error("Google Map API fail to load");

        document.head.appendChild(script);

        return ()=>{
            document.head.removeChild(script);
        };
    }, [import.meta.env.VITE_GOOGLE_PLACE_API_KEY]);

    return isLoad;

}

export default useLoadGoogleMaps