import React, { useState } from "react";
import "./Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Dr. Amelia Chen",
      type: "bot",
      text: "Hello, I'm Dr. Chen. How can I assist you today?",
    },
    {
      id: 2,
      sender: "You",
      type: "user",
      text: "Hi Dr. Chen, I've been experiencing persistent headaches and fatigue for the past few weeks. It's affecting my daily activities, and I'm concerned about the underlying cause.",
    },
    {
      id: 3,
      sender: "Dr. Amelia Chen",
      type: "bot",
      text: "I understand your concern. Headaches and fatigue can be quite disruptive. To better understand your situation, could you describe the nature of your headaches? Are they throbbing, constant, or localized to a specific area? Also, have you noticed any triggers or patterns, such as time of day or specific activities?",
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "You", type: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="chat-container d-flex flex-column vh-100 bg-light">
      {/* Header */}
      <header className="d-flex align-items-center justify-content-between border-bottom px-3 py-2 bg-white">
        <div className="d-flex align-items-center gap-2">
          <div className="logo text-primary">
            <svg fill="currentColor" viewBox="0 0 48 48" width="32" height="32">
              <path d="M36.7 44c-2.7 0-5.1-4.2-6.3-10.3-1.2 6.1-3.6 10.3-6.4 10.3s-5.2-4.2-6.3-10.3C16.4 39.8 14 44 11.3 44 7.3 44 4 35 4 24S7.3 4 11.3 4c2.7 0 5.1 4.2 6.3 10.3C18.9 8.2 21.3 4 24 4s5.2 4.2 6.3 10.3C31.6 8.2 34 4 36.7 4 40.7 4 44 13 44 24s-3.3 20-7.3 20z"/>
            </svg>
          </div>
          <h1 className="h5 fw-bold mb-0">HealthAI</h1>
        </div>
        <img
          alt="User Avatar"
          className="rounded-circle"
          style={{ width: "40px", height: "40px", objectFit: "cover" }}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTpScVCu6kdJmsUZ0rQSWM6I4ZpLgWfgIj3X5PaMUfD2yGjgSK4tGOCYEdNc5-7XgLw4_pAARSc9xdKLCJwaN8IO7qjMmgNGR_nTNY2Uk8hJLOMqHb8UVNz6I14HTmy9tIFT9YbI4AHmCD4aMQ4qur8ePpDGaWiiPSFt_0xHPV1QnDb_NyBhsGFONEE7z67viaF3k3hUF73zpntXAj0iR0c4t7cmVIFaH0XqxsirhzA21cMJWH59LlzkMy5YC9l537laxj6MLa7g"
        />
      </header>

      {/* Messages */}
      <main className="flex-grow-1 overflow-auto p-3">
        <div className="text-center mb-4">
          <h2 className="h4 fw-bold">Dr. Amelia Chen</h2>
          <p className="text-muted">Your AI Medical Assistant</p>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`d-flex mb-3 ${msg.type === "user" ? "justify-content-end" : "justify-content-start"}`}
          >
            {msg.type === "bot" && (
              <img
                alt="Dr. Chen"
                className="rounded-circle me-2"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOPmpmgyClH875IyGCm1Z_aX7r5ebIh7wAkADp1dZKirgQ5eRkWiaHHPWNRv_FZx1pJdxrIVkfDDRyQ8_-mog4x6eTX7pMEyS2umlCpS3qS4YOJDgntEOv6FHTDKflQwHOvJWl3AVkjjVMlLnlA1OKS0vfuBqpmfV1ZQI_yVL6FIAwpLWUOop8ONiUx5as49SfGqdeudnj3r7yWMxXXP56zD6xyJmDYgKCjaN3gusmxHknnc_dzDfJHbc-IIwrSP-lNjPMFDkbww"
              />
            )}
            <div className={`p-3 rounded ${msg.type === "user" ? "bg-primary text-white" : "bg-light border"}`}>
              <small className="d-block fw-bold mb-1">{msg.sender}</small>
              <span>{msg.text}</span>
            </div>
            {msg.type === "user" && (
              <img
                alt="You"
                className="rounded-circle ms-2"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnIxjLtC2JyU-hCPswlU9PPi7uxc0Xn_xa2kjUUeQN_q6UjxVpZB3_WvPgBTfUDZKUDzb091XkCHSSEjKO2hqSZ42g6TGPLWUMqVmbZ21E1fNV2Qd1z_VP8HpCB-tgTkBXo2Jkjw5uQP-BPAWXv0d18Fp7ogwwxxQTaYtfMfJu9UrUc2f9UBxVnl_JYIjv7ouhxQpIZLOisQbvRW2N4oDFFMMB-rUjIVDYVRVjomA6OvzmkAZ7wkffdhv5s77E-dYtz2hDmxohBA"
              />
            )}
          </div>
        ))}
      </main>

      {/* Input */}
      <footer className="border-top bg-white p-3">
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} className="btn btn-primary">
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
