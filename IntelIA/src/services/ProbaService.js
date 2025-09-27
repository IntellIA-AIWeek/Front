// src/services/hfService.js
const HF_TOKEN = ""; // guarda tu token en .env.local

const HF_API = "https://api-inference.huggingface.co/models";

export async function extractSymptoms(description) {
  const response = await fetch(`${HF_API}/mihalca/SymptoAI`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: description }),
  });

  if (!response.ok) {
    throw new Error("Error al llamar a SymptoAI");
  }

  return response.json(); // síntomas estructurados
}

export async function predictDiseases(vectorizedSymptoms) {
  const response = await fetch(`${HF_API}/isharane/disease-prediction`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: vectorizedSymptoms }),
  });

  if (!response.ok) {
    throw new Error("Error al llamar a Disease Prediction");
  }

  return response.json(); // probabilidades de enfermedades
}
