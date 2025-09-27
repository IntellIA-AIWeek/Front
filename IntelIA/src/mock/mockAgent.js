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
      sx_ppal: "Fiebre alta con tos y dolor de garganta.",
      inicio: "Inicio repentino, comenzó hace tres días en la noche.",
      duracion: "Tres días continuos.",
      curso: "Ha empeorado ligeramente desde el primer día.",
      intensidad: "7/10",
      localizacion: "Molestia principal en la garganta y cabeza; malestar general.",
      irradiacion: "El dolor de garganta no irradia; el dolor de cabeza se siente hacia la frente.",
      factores_agravantes: "Aire frío y hablar mucho empeoran la garganta; el esfuerzo físico aumenta la tos.",
      factores_aliviantes: "Líquidos tibios y reposo; paracetamol baja la fiebre temporalmente.",
      antecedentes: "Sin enfermedades crónicas conocidas; resfriados frecuentes en invierno.",
      medicamentos: "Paracetamol 500 mg cada 8 horas desde ayer.",
      alergias: "Niega alergias a medicamentos y alimentos.",
      habitos: "No fuma; alcohol social ocasional; duerme 6 horas promedio.",
      red_flags: "Niega dolor torácico intenso, desmayos, sangrado o disnea severa.",
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
