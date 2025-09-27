import React, { useState } from "react";
import { extractSymptoms } from "../services/symptoService";

const TestSympto = () => {
  const [result, setResult] = useState(null);

  const handleTest = async () => {
    const res = await extractSymptoms("Tengo dolor de cabeza y mareo");
    console.log("Resultado SymptoAI:", res);
    setResult(res);
  };

  return (
    <div className="p-3">
      <button className="btn btn-primary" onClick={handleTest}>
        Probar SymptoAI
      </button>
      {result && (
        <pre className="mt-3 text-start">{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
};

export default TestSympto;
