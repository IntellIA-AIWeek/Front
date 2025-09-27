//import React, { useState } from "react";
import Chat from "./components/Chat";
import Report from "./components/Report";
import TestHF from "./components/TestHF";

function App() {
  //const [view, setView] = useState("chat");
  
  return <TestHF />;


  // return (
  //   <div>
  //     {view === "chat" && <Chat />}
  //     {view === "report" && <Report />}
      
  //     <div className="fixed bottom-4 right-4 flex gap-2">
  //       <button
  //         onClick={() => setView("chat")}
  //         className="px-4 py-2 bg-blue-500 text-white rounded"
  //       >
  //         Chat
  //       </button>
  //       <button
  //         onClick={() => setView("report")}
  //         className="px-4 py-2 bg-green-500 text-white rounded"
  //       >
  //         Reporte
  //       </button>
  //     </div>
  //   </div>
  // );
}

export default App;
