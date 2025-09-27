// src/mock/mockAgent.js

/**
 * Simula las respuestas del agente de IA médica.
 * NOTA: aquí NO se llama al backend, solo se simula la conversación y se devuelven síntomas.
 */

export const simulateAgentResponse = async (userMessage, step) => {
  // Paso 1: Consentimiento
  if (step === "consent") {
    if (userMessage.toLowerCase().includes("acepto")) {
      return {
        sender: "Dr. Amelia Chen",
        type: "bot",
        text: "Gracias por aceptar. Empezaré con algunas preguntas. ¿Cuál es el motivo principal de su consulta hoy?",
        nextStep: "anamnesis",
      };
    } else {
      return {
        sender: "Dr. Amelia Chen",
        type: "bot",
        text: "Comprendo y respeto su decisión. Si necesita atención, por favor contacte a un profesional de salud.",
        end: true,
      };
    }
  }

  // Paso 2: Anamnesis (simulada)
  if (step === "anamnesis") {
    return {
      sender: "Dr. Amelia Chen",
      type: "bot",
      text: "Entiendo. ¿Tiene antecedentes médicos importantes como hipertensión, diabetes o enfermedades cardíacas?",
      nextStep: "anamnesis-2",
    };
  }

  if (step === "anamnesis-2") {
    return {
      sender: "Dr. Amelia Chen",
      type: "bot",
      text: "¿Presenta además otros síntomas asociados, como falta de aire, sudoración o mareos?",
      nextStep: "ready-for-model",
    };
  }

  // Paso 3: Simulación de IA → Devuelve structuredData con síntomas
  if (step === "ready-for-model") {
    // ✅ Simulación de lo que devolvería el agente IA con toda la historia clínica y síntomas ya procesados
    const mockStructuredData = {
      motivo_consulta: "dolor en el pecho",
      enfermedad_actual: {
        sintoma_principal: "dolor torácico",
        inicio: "1 día",
        caracteristicas: "constante",
      },
      antecedentes_personales: ["hipertensión"],
      antecedentes_familiares: ["infarto en padre"],
      habitos: { tabaquismo: "no", alcohol: "no" },
      sintomas_asociados: ['muscle_pain', 'irritability',],
      sintomas_vector: [ ],
    };

    return {
      structuredData: mockStructuredData,
      nextStep: "report", // 👈 Aquí Chat.jsx ya sabe que debe generar el reporte
    };
  }

  return null;
};
