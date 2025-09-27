// src/App.jsx
import React, { useState } from "react";
import Chat from "./components/Chat";
import Report from "./components/Report";

const App = () => {
  const [reportData, setReportData] = useState(null);

  return (
    <div className="app">
      {!reportData ? (
        <Chat onFinish={(data) => setReportData(data)} />
      ) : (
        <Report {...reportData} />
      )}
    </div>
  );
};

export default App;
