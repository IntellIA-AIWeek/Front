// src/mock/mockAgent.js

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

  // Paso 2: Anamnesis (simulación simplificada)
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

  // Paso 3 & 4: Simulación de modelos
  if (step === "ready-for-model") {
    // Simulamos salida de SymptoAI y clasificador
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
      sintomas_asociados: ["mareo"],
    };

    const mockPrediction = [
      { disease: "Infarto agudo de miocardio", probability: 0.72 },
      { disease: "Angina de pecho", probability: 0.18 },
      { disease: "Ansiedad", probability: 0.10 },
    ];

    return {
      structuredData: mockStructuredData,
      prediction: mockPrediction,
      nextStep: "report",
    };
  }

  return null;
};
