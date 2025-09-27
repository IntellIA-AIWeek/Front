from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
from fastapi.middleware.cors import CORSMiddleware  # Importa CORSMiddleware

# Inicializa el pipeline de disease prediction
disease_pipeline = pipeline("text-classification", model="isharane/disease-prediction")

# Crea la aplicación FastAPI
app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Permite peticiones desde el frontend (ajusta si usas otro puerto)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos los headers
)

# Define el modelo de entrada para la descripción de síntomas
class SymptomsRequest(BaseModel):
    description: str

@app.post("/predict-diseases/")
async def predict_diseases(request: SymptomsRequest):
    # Paso 1: Procesar la descripción de los síntomas y convertirla a un vector binario
    symptoms = request.description.split(",")  # Suponemos que los síntomas se pasan como texto separado por comas

    # Mapeo de síntomas (ajusta según tu lista de síntomas)
    symptom_map = {
        "dolor_de_cabeza": 0,
        "mareo": 1,
        "fiebre": 2,
        "náuseas": 3,
        "dificultad_para_respirar": 4,
        "cansancio": 5,
        "dolor_muscular": 6
    }

    # Convertir los síntomas en un vector binario
    symptom_vector = [0] * len(symptom_map)
    for symptom in symptoms:
        symptom = symptom.strip().lower()  # Limpiar y normalizar el texto
        if symptom in symptom_map:
            symptom_vector[symptom_map[symptom]] = 1

    # Paso 2: Usar el modelo 'isharane/disease-prediction' para predecir enfermedades
    prediction = disease_pipeline(symptom_vector)

    # Devolver el resultado
    return {"prediction": prediction}
