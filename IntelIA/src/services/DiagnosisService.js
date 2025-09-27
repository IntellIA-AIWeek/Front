import { pipeline } from "@huggingface/transformers";

let symptoPipe = null;

// Inicializa el modelo (puede tardar la primera vez)
export async function initSymptoAI() {
  if (!symptoPipe) {
    symptoPipe = await pipeline("text-classification", "mihalca/SymptoAI");
  }
  return symptoPipe;
}

// Llama al modelo con un texto
export async function extractSymptoms(description) {
  const pipe = await initSymptoAI();
  const result = await pipe(description);
  return result;
}
