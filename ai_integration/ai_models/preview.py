import google.generativeai as genai
from flask import Blueprint, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables from .env.local
load_dotenv(".env.local")

# Blueprint for handling insights requests and Enable CORS
preview_bp = Blueprint('insights', __name__)
CORS(preview_bp, origins=["http://localhost:5173"])

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
        "I am planning a trip to Dubai - United Arab Emirates and would appreciate receiving detailed travel information in a well-structured JSON format. Specifically, I would like to request a full address of the destination, along with a list of famous hotels including their names, addresses, and image URLs. Additionally, I would like to know about the top restaurants in the area, including the restaurant name, cuisine type, address, and image URLs. Furthermore, I am interested in notable tourist attractions, with details such as attraction name, a brief description, address, and image URLs. The data should be clear, well-organized, and easy to parse for further use.",
      ],
    },
    {
      "role": "model",
      "parts": [
        "```json\n{\n  \"destination\": {\n    \"address\": \"Dubai, United Arab Emirates\",\n    \"hotels\": [\n      {\n        \"name\": \"Burj Al Arab Jumeirah\",\n        \"address\": \"Jumeirah Beach Rd, Dubai, United Arab Emirates\",\n        \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Burj_Al_Arab_from_Jumeirah_Beach_Hotel.jpg/1280px-Burj_Al_Arab_from_Jumeirah_Beach_Hotel.jpg\" \n      },\n      {\n        \"name\": \"Armani Hotel Dubai\",\n        \"address\": \"Burj Khalifa, Downtown Dubai, Dubai, United Arab Emirates\",\n        \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Armani_Hotel_Dubai.jpg/1280px-Armani_Hotel_Dubai.jpg\"\n      },\n      {\n        \"name\": \"One&Only The Palm\",\n        \"address\": \"Palm Jumeirah, Dubai, United Arab Emirates\",\n        \"imageUrl\": \"https://dynamic-media.cdn.cnn.com/api/v1/image/345187_1.jpg?q=80&size=largest&w=1200&h=799&f=jpg&c=1\"\n      }\n    ],\n    \"restaurants\": [\n      {\n        \"name\": \"Pierchic\",\n        \"cuisine\": \"Seafood\",\n        \"address\": \"Al Qasr Hotel, Madinat Jumeirah, Dubai, United Arab Emirates\",\n        \"imageUrl\": \"https://www.alqasr.com/content/dam/ Jumeirah/al-qasr/restaurants-and-bars/pierchic/pierchic-main-image.jpg/_jcr_content/renditions/cq5dam.web.1280.1280.jpeg\"\n      },\n      {\n        \"name\": \"Thiptara\",\n        \"cuisine\": \"Thai\",\n        \"address\": \"Palace Downtown, Downtown Dubai, Dubai, United Arab Emirates\",\n        \"imageUrl\": \"https://cdn.thpt.edu.vn/media/images/2021/11/04/thiptara-dubai-restaurant-04.jpg\"\n      },\n      {\n        \"name\": \"Al Ustad Special Kabab\",\n        \"cuisine\": \"Pakistani/Indian\",\n        \"address\": \"Various locations in Dubai\",\n        \"imageUrl\": \"https://cdn.hungryapp.in/images/restaurant/thumbnail/al-ustad-special-kabab-karachi-pakistan-1653556473.jpg\"\n      }\n    ],\n    \"touristAttractions\": [\n      {\n        \"name\": \"Burj Khalifa\",\n        \"description\": \"The world's tallest building.\",\n        \"address\": \"Downtown Dubai, Dubai, United Arab Emirates\",\n        \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Burj_Khalifa_from_Dubai_Mall_2016-01-13.jpg/1280px-Burj_Khalifa_from_Dubai_Mall_2016-01-13.jpg\"\n      },\n      {\n        \"name\": \"The Dubai Mall\",\n        \"description\": \"One of the world's largest shopping malls.\",\n        \"address\": \"Downtown Dubai, Dubai, United Arab Emirates\",\n        \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Dubai_Mall_exterior.jpg/1280px-Dubai_Mall_exterior.jpg\"\n      },\n      {\n        \"name\": \"Palm Jumeirah\",\n        \"description\": \"An artificial archipelago in the shape of a palm tree.\",\n        \"address\": \"Palm Jumeirah, Dubai, United Arab Emirates\",\n        \"imageUrl\": \"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Palm_Jumeirah_aerial_view.jpg/1280px-Palm_Jumeirah_aerial_view.jpg\"\n      }\n    ]\n  }\n}\n```\n\n**Note:**  Image URLs are examples and may change over time.  You should replace these with current, valid URLs if you intend to use this data in a production application.  Also, this JSON only provides a small sample of hotels, restaurants, and attractions.  A comprehensive list would be significantly larger.  Consider using APIs like Google Places API or similar services to dynamically fetch up-to-date information.\n",
      ],
    },
  ]
)

# API endpoint to receive user requests and get insights
@preview_bp.route('/preview', methods=['POST'])
def get_insights():
    data = request.data.decode('utf-8')
    response = chat_session.send_message(data)
    return (response.text)