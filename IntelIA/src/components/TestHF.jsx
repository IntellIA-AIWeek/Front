import React, { useState } from "react";
import { extractSymptoms, predictDiseases } from "../services/hfService";

const TestHF = () => {
  const [result, setResult] = useState(null);

  const handleTest = async () => {
    const symptoms = await extractSymptoms("Tengo dolor en el pecho y mareo");
    console.log("Síntomas estructurados:", symptoms);

    // por ahora vector dummy
    const vector = [1, 0, 0, 1];
    const prediction = await predictDiseases(vector);

    console.log("Predicción enfermedades:", prediction);
    setResult({ symptoms, prediction });
  };

  return (
    <div className="p-3">
      <button onClick={handleTest} className="btn btn-primary">
        Probar HuggingFace
      </button>
      {result && (
        <pre className="mt-3 text-start">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default TestHF;
