import google.generativeai as genai
from flask import Blueprint, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables from .env.local
load_dotenv(".env.local")

# Blueprint for handling insights requests and Enable CORS
itinerary_bp = Blueprint('itinerary', __name__)
CORS(itinerary_bp, origins=["http://localhost:5173"])

genai.configure(api_key = os.getenv("VITE_GOOGLE_GEMINI_API_KEY"))

# Configuration for the Gemini model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}

# Initialize the Gemini model
model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
)

# Initial chat session with a prompt for Dubai travel information.  This sets up the conversation context.
chat_session = model.start_chat(
  history=[
    {
      "role": "user",
      "parts": [
        "Generate a detailed, day-by-day travel itinerary in JSON format for a trip from Delhi to Dubai, starting on 3rd February 2025, and ending on 7th February 2025. The trip should be budgeted at a mid range ($100 - $300 per day) level, with a particular interest in cities. For each day, provide a schedule that includes a list of activities with the following details: the time of the activity, the name of the place or event, a brief description of the activity or location, the full address of the location, and estimated costs for meals, activities, and transportation. The itinerary should also include the total daily costs for meals, transportation, and activities. Additionally, provide a trip summary at the end of the response, including the destination, the start and end dates, the overall trip cost (summed from all days), and the currency. The recommendations should be culturally relevant, incorporating local landmarks, traditions, food, and other seasonal factors. Tailor the activities to be engaging for a family, ensuring they are appropriate for a variety of age groups and align with the relaxation travel style.",
      ],
    },
    {
      "role": "model",
      "parts": [
        "```json\n{\n  \"trip\": {\n    \"destination\": \"Dubai\",\n    \"startDate\": \"2025-02-03\",\n    \"endDate\": \"2025-02-07\",\n    \"currency\": \"USD\"\n  },\n  \"itinerary\": [\n    {\n      \"day\": \"2025-02-03\",\n      \"activities\": [\n        {\n          \"time\": \"10:00\",\n          \"place\": \"Indira Gandhi International Airport (DEL)\",\n          \"description\": \"Departure from Delhi. Flight to Dubai.\",\n          \"address\": \"New Delhi, Delhi 110037, India\",\n          \"meals\": 20,\n          \"activities\": 0,\n          \"transportation\": 300 \n        },\n        {\n          \"time\": \"14:00\",\n          \"place\": \"Dubai International Airport (DXB)\",\n          \"description\": \"Arrival in Dubai, transfer to hotel.\",\n          \"address\": \"Dubai, United Arab Emirates\",\n          \"meals\": 30,\n          \"activities\": 0,\n          \"transportation\": 50\n        },\n        {\n          \"time\": \"16:00\",\n          \"place\": \"Burj Khalifa\",\n          \"description\": \"Visit the observation deck for stunning city views.\",\n          \"address\": \"Downtown Dubai - Dubai - United Arab Emirates\",\n          \"meals\": 0,\n          \"activities\": 100,\n          \"transportation\": 20\n        },\n        {\n          \"time\": \"19:00\",\n          \"place\": \"Al Ustad Special Kabab\",\n          \"description\": \"Dinner at a restaurant specializing in Arabic cuisine.\",\n          \"address\": \"Various locations across Dubai\",\n          \"meals\": 80,\n          \"activities\": 0,\n          \"transportation\": 10\n        }\n      ],\n      \"total\": {\n        \"meals\": 130,\n        \"activities\": 100,\n        \"transportation\": 380\n      }\n    },\n    {\n      \"day\": \"2025-02-04\",\n      \"activities\": [\n        {\n          \"time\": \"9:00\",\n          \"place\": \"Dubai Mall\",\n          \"description\": \"Explore the world's largest shopping mall.\",\n          \"address\": \"Downtown Dubai - Dubai - United Arab Emirates\",\n          \"meals\": 0,\n          \"activities\": 50,\n          \"transportation\": 10\n        },\n        {\n          \"time\": \"12:00\",\n          \"place\": \"Dubai Aquarium & Underwater Zoo\",\n          \"description\": \"Discover diverse marine life.\",\n          \"address\": \"Inside Dubai Mall, Downtown Dubai - Dubai - United Arab Emirates\",\n          \"meals\": 40,\n          \"activities\": 80,\n          \"transportation\": 0\n        },\n        {\n          \"time\": \"15:00\",\n          \"place\": \"Dubai Fountain\",\n          \"description\": \"Watch the mesmerizing water show.\",\n          \"address\": \"Downtown Dubai - Dubai - United Arab Emirates\",\n          \"meals\": 0,\n          \"activities\": 0,\n          \"transportation\": 5\n        },\n        {\n          \"time\": \"19:00\",\n          \"place\": \"Pierchic Restaurant\",\n          \"description\": \"Enjoy a fine dining experience at a restaurant on a pier.\",\n          \"address\": \"Al Qasr Hotel, Madinat Jumeirah, Dubai, UAE\",\n          \"meals\": 150,\n          \"activities\": 0,\n          \"transportation\": 20\n        }\n      ],\n      \"total\": {\n        \"meals\": 190,\n        \"activities\": 130,\n        \"transportation\": 35\n      }\n    },\n    {\n      \"day\": \"2025-02-05\",\n      \"activities\": [\n        {\n          \"time\": \"9:00\",\n          \"place\": \"Al Fahidi Historical Neighbourhood (Bastakiya)\",\n          \"description\": \"Explore the historic district with its wind towers.\",\n          \"address\": \"Bur Dubai, Dubai, United Arab Emirates\",\n          \"meals\": 0,\n          \"activities\": 20,\n          \"transportation\": 15\n        },\n        {\n          \"time\": \"11:00\",\n          \"place\": \"Dubai Museum\",\n          \"description\": \"Learn about Dubai's history and culture.\",\n          \"address\": \"Al Fahidi Fort, Bur Dubai, Dubai, UAE\",\n          \"meals\": 30,\n          \"activities\": 30,\n          \"transportation\": 5\n        },\n        {\n          \"time\": \"13:00\",\n          \"place\": \"Abra ride across Dubai Creek\",\n          \"description\": \"Traditional boat ride across the creek.\",\n          \"address\": \"Dubai Creek, Bur Dubai\",\n          \"meals\": 40,\n          \"activities\": 10,\n          \"transportation\": 5\n        },\n        {\n          \"time\": \"17:00\",\n          \"place\": \"Spice Souk & Gold Souk\",\n          \"description\": \"Experience the vibrant atmosphere of the souks.\",\n          \"address\": \"Deira, Dubai, United Arab Emirates\",\n          \"meals\": 0,\n          \"activities\": 0,\n          \"transportation\": 10\n        },\n        {\n          \"time\": \"20:00\",\n          \"place\": \"Local Emirati Restaurant\",\n          \"description\": \"Enjoy traditional Emirati food.\",\n          \"address\": \"Various locations, search for local recommendations\",\n          \"meals\": 70,\n          \"activities\": 0,\n          \"transportation\": 10\n        }\n      ],\n      \"total\": {\n        \"meals\": 140,\n        \"activities\": 60,\n        \"transportation\": 45\n      }\n    },\n    {\n      \"day\": \"2025-02-06\",\n      \"activities\": [\n        {\n          \"time\": \"9:00\",\n          \"place\": \"IMG Worlds of Adventure\",\n          \"description\": \"Spend the day at this indoor theme park.\",\n          \"address\": \"City of Arabia, Dubai, UAE\",\n          \"meals\": 50,\n          \"activities\": 150,\n          \"transportation\": 30\n        },\n        {\n          \"time\": \"19:00\",\n          \"place\": \"Casual Dinner at the Hotel\",\n          \"description\": \"Relaxing dinner at the hotel restaurant.\",\n          \"address\": \"Hotel Address\",\n          \"meals\": 60,\n          \"activities\": 0,\n          \"transportation\": 0\n        }\n      ],\n      \"total\": {\n        \"meals\": 110,\n        \"activities\": 150,\n        \"transportation\": 30\n      }\n    },\n    {\n      \"day\": \"2025-02-07\",\n      \"activities\": [\n        {\n          \"time\": \"9:00\",\n          \"place\": \"Jumeirah Beach Residence (JBR)\",\n          \"description\": \"Relax on the beach and enjoy the atmosphere.\",\n          \"address\": \"Jumeirah Beach Residence, Dubai, UAE\",\n          \"meals\": 40,\n          \"activities\": 20,\n          \"transportation\": 10\n        },\n        {\n          \"time\": \"13:00\",\n          \"place\": \"Dubai International Airport (DXB)\",\n          \"description\": \"Departure from Dubai.\",\n          \"address\": \"Dubai, United Arab Emirates\",\n          \"meals\": 30,\n          \"activities\": 0,\n          \"transportation\": 50\n        }\n      ],\n      \"total\": {\n        \"meals\": 70,\n        \"activities\": 20,\n        \"transportation\": 60\n      }\n    }\n  ],\n  \"tripSummary\": {\n    \"destination\": \"Dubai\",\n    \"startDate\": \"2025-02-03\",\n    \"endDate\": \"2025-02-07\",\n    \"overallTripCost\": {\n      \"meals\": 640,\n      \"activities\": 460,\n      \"transportation\": 905\n    },\n    \"totalCost\": 2005,\n    \"currency\": \"USD\"\n  }\n}\n```\n\n**Note:**  This is a sample itinerary.  Actual costs can vary depending on the time of year, specific choices of restaurants and activities, and unforeseen circumstances.  Hotel costs are not included in the daily breakdown, as that would heavily influence the daily budget.  Consider budgeting separately for accommodation based on your preference (mid-range hotels would be appropriate given the daily budget).  Always check for seasonal events and adjust the itinerary accordingly.  The address information provided for some locations is generalized; specific addresses would need to be confirmed closer to the travel date.  Restaurant choices are examples and can be substituted with other options based on your preference.\n",
      ],
    },
  ]
)

# API endpoint to receive user requests and get itinerary
@itinerary_bp.route('/plan', methods=['POST'])
def get_insights():
    data = request.data.decode('utf-8')
    response = chat_session.send_message(data)
    return (response.text)