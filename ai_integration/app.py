from flask import Flask
from flask_cors import CORS
from ai_models.preview import preview_bp
from ai_models.assistant import assistant_bp
from ai_models.itinerary import itinerary_bp

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"]) 

# Register Blueprints (Modules)
app.register_blueprint(preview_bp, url_prefix='/api/insights')
app.register_blueprint(assistant_bp, url_prefix='/api/assistant')
app.register_blueprint(itinerary_bp, url_prefix='/api/itinerary')

if __name__ == "__main__":
    app.run(debug=True)
