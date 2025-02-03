// Content for feature cards
export const home_cards = [
    {
        id: 1,
        title: 'Explore Destinations',
        description: 'Discover top attractions, hidden gems, and local insights.',
        icon: '🗺️',
        link_text: 'Explore',
        link_path: '/insights'
    },
    {
        id: 2,
        title: 'Plan Together',
        description: 'Collaborate live with your group and finalize plans easily',
        icon: '🧑‍🤝‍🧑',
        link_text: 'Group Chatroom',
        link_path: '/collaboration'
    },
    {
        id: 3,
        title: 'Create Itinerary',
        description: 'Get a personalized travel plan instantly with AI.',
        icon: '✈️',
        link_text: 'Generate',
        link_path: '/user-preference'
    }
];

// Sample prompt for destination preview
export const PREVIEW_PROMPT = 'I am planning a trip to {location} and would appreciate receiving detailed travel information in a well-structured JSON format. Specifically, I would like to request a full address of the destination, along with a list of famous hotels including their names, addresses, and image URLs. Additionally, I would like to know about the top restaurants in the area, including the restaurant name, cuisine type, address, and image URLs. Furthermore, I am interested in notable tourist attractions, with details such as attraction name, a brief description, address, and image URLs. The data should be clear, well-organized, and easy to parse for further use.';

// Sample prompt for destination preview
export const ITINERARY_PROMPT = 'Generate a detailed, day-by-day travel itinerary in JSON format for a trip from {starting} to {destination}, starting on {start}, and ending on {end}. The trip should be budgeted at a {budget} level, with a particular interest in {interest}. For each day (day in the format: {21st February, 2025}), provide a schedule that includes a list of activities with the following details: the time of the activity, the name of the place or event, a brief description of the activity or location, the full address of the location, and estimated costs for meals, activities, and transportation. The itinerary should also include the total daily costs for meals, transportation, and activities. Additionally, provide a trip summary at the end, including the destination, the start and end dates in the format: {21st February, 2025}, the overall trip cost (summed from all days), and the currency. The recommendations should be culturally relevant, incorporating local landmarks, traditions, food, and other seasonal factors. Tailor the activities to be engaging for a {group}, ensuring they are appropriate for a variety of age groups and align with the {style} travel style.'