// Este servicio se encarga de llamar al backend para obtener las top 3 probabilidades

const API_URL = "http://localhost:8000"; // cambia si el backend está desplegado en otro lado

/**
 * Envía los síntomas al backend y obtiene las top 3 predicciones de enfermedad
 * @param {string[]} symptoms - Lista de síntomas seleccionados
 * @returns {Promise<Object>} - Respuesta JSON del backend con top_predictions
 */
export async function getTopProbabilities(symptoms) {
  try {
    const response = await fetch(`${API_URL}/predict-probabilities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symptoms }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data; // { top_predictions: [...] }
  } catch (error) {
    console.error("❌ Error en getTopProbabilities:", error);
    return null;
  }
}
