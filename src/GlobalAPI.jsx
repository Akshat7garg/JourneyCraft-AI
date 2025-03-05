import axios from "axios"

const config = {
    headers: {
        'Content-Type': "application/json",
        'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
        'X-Goog-FieldMask': [
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

export const getPlaceDetails = (data) => axios.post(import.meta.env.VITE_GOOGLE_PLACE_TEXT_URL, data, config)