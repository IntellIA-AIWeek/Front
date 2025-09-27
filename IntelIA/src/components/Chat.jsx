import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { simulateAgentResponse } from "../mock/mockAgent";
import { FaPaperPlane } from "react-icons/fa";

const Chat = ({ onFinish }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Dr. Amelia Chen",
      type: "bot",
      text: "Hello, I'm Dr. Chen. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState("consent");
  const [isSending, setIsSending] = useState(false);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isSending) return;

    const userMsg = {
      id: Date.now() + Math.random(),
      sender: "You",
      type: "user",
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsSending(true);

    try {
      const response = await simulateAgentResponse(text, step);
      if (response) {
        const botMsg = {
          id: Date.now() + Math.random(),
          sender: "Dr. Amelia Chen",
          type: "bot",
          text: response.text,
        };
        setMessages((prev) => [...prev, botMsg]);

        if (response.nextStep) setStep(response.nextStep);
        if (response.nextStep === "report" && onFinish) {
          onFinish({
            structuredData: response.structuredData,
            prediction: response.prediction,
          });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="d-flex flex-column bg-light min-vh-100">

      {/* ✅ TOP BAR estilo navbar */}
      <nav className="d-flex align-items-center justify-content-between px-4 py-2 border-bottom bg-white shadow-sm">
        <div className="d-flex align-items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2950/2950670.png"
            alt="Logo"
            style={{ width: 32, height: 32, marginRight: 10 }}
          />
          <span className="fw-bold fs-5">HealthAI</span>
        </div>
        <div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTpScVCu6kdJmsUZ0rQSWM6I4ZpLgWfgIj3X5PaMUfD2yGjgSK4tGOCYEdNc5-7XgLw4_pAARSc9xdKLCJwaN8IO7qjMmgNGR_nTNY2Uk8hJLOMqHb8UVNz6I14HTmy9tIFT9YbI4AHmCD4aMQ4qur8ePpDGaWiiPSFt_0xHPV1QnDb_NyBhsGFONEE7z67viaF3k3hUF73zpntXAj0iR0c4t7cmVIFaH0XqxsirhzA21cMJWH59LlzkMy5YC9l537laxj6MLa7g"
            alt="Profile"
            className="rounded-circle"
            style={{ width: 36, height: 36 }}
          />
        </div>
      </nav>

      {/* Header del chat */}
      <header className="text-center py-3 bg-white border-bottom">
        <h1 className="fw-bold fs-4 mb-1">Dr. Amelia Chen</h1>
        <p className="text-muted mb-0">Your AI Medical Assistant</p>
      </header>

      {/* ✅ BOX SOLO PARA LOS MENSAJES */}
      <main
        className="flex-grow-1 mx-auto my-3 p-3 bg-white rounded-4 shadow-sm overflow-auto"
        style={{ width: "100%", maxWidth: "800px", height: "400px" }}
        ref={messagesRef}
      >
        {messages.map((msg) => {
          const isUser = msg.type === "user";
          return (
            <div
              key={msg.id}
              className={`d-flex mb-3 ${
                isUser ? "justify-content-end" : "justify-content-start"
              } fade-in-up`}
            >
              {!isUser && (
                <img
                  alt="Bot avatar"
                  className="avatar me-2 rounded-circle"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTpScVCu6kdJmsUZ0rQSWM6I4ZpLgWfgIj3X5PaMUfD2yGjgSK4tGOCYEdNc5-7XgLw4_pAARSc9xdKLCJwaN8IO7qjMmgNGR_nTNY2Uk8hJLOMqHb8UVNz6I14HTmy9tIFT9YbI4AHmCD4aMQ4qur8ePpDGaWiiPSFt_0xHPV1QnDb_NyBhsGFONEE7z67viaF3k3hUF73zpntXAj0iR0c4t7cmVIFaH0XqxsirhzA21cMJWH59LlzkMy5YC9l537laxj6MLa7g"
                  style={{ width: 40, height: 40 }}
                />
              )}
              <div
                className={`bubble px-3 py-2 rounded-3 ${
                  isUser ? "bg-primary text-white" : "bg-light text-dark"
                }`}
                style={{ maxWidth: "70%" }}
              >
                {!isUser && (
                  <small className="d-block fw-semibold mb-1">
                    {msg.sender}
                  </small>
                )}
                {msg.text}
              </div>
              {isUser && (
                <img
                  alt="User avatar"
                  className="avatar ms-2 rounded-circle"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnIxjLtC2JyU-hCPswlU9PPi7uxc0Xn_xa2kjUUeQN_q6UjxVpZB3_WvPgBTfUDZKUDzb091XkCHSSEjKO2hqSZ42g6TGPLWUMqVmbZ21E1fNV2Qd1z_VP8HpCB-tgTkBXo2Jkjw5uQP-BPAWXv0d18Fp7ogwwxxQTaYtfMfJu9UrUc2f9UBxVnl_JYIjv7ouhxQpIZLOisQbvRW2N4oDFFMMB-rUjIVDYVRVjomA6OvzmkAZ7wkffdhv5s77E-dYtz2hDmxohBA"
                  style={{ width: 40, height: 40 }}
                />
              )}
            </div>
          );
        })}
      </main>

      {/* Footer con input */}
      <footer className="border-top py-3 bg-white">
        <div className="mx-auto w-100 px-3" style={{ maxWidth: "800px" }}>
          <div className="d-flex align-items-center bg-light rounded-pill px-3 py-2 shadow-sm">
            <input
              type="text"
              className="form-control border-0 bg-transparent"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              style={{ boxShadow: "none" }}
            />
            <button
              className="btn btn-primary rounded-circle d-flex align-items-center justify-content-center ms-2"
              style={{ width: 40, height: 40 }}
              onClick={handleSend}
              disabled={isSending || !input.trim()}
            >
              <FaPaperPlane size={16} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
