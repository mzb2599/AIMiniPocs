import React, { useState, useRef, useEffect } from "react";

function AIChatMode() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Assalamu Alaikum. I am your guide to the wisdom of Nahjul Balagah — the collection of sermons, letters, and sayings of Imam Ali ibn Abi Talib (AS). Ask me anything about its teachings.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
    try {
      // proxy request through backend to avoid CORS and hide API key
      const base = import.meta.env.VITE_API_URL || "/api";
      const res = await fetch(`${base}/ask?q=${encodeURIComponent(userMsg)}`);
      const data = await res.json();
      const text =
        data.answer || "I could not retrieve a response at this time.";
      setMessages((prev) => [...prev, { role: "assistant", text }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "An error occurred. Please try again." },
      ]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            {m.role === "assistant" && (
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "rgba(201,168,76,0.15)",
                  border: "1px solid rgba(201,168,76,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  marginRight: "8px",
                  flexShrink: 0,
                  marginTop: "2px",
                }}
              >
                ✦
              </div>
            )}
            <div
              style={{
                maxWidth: "78%",
                padding: "12px 14px",
                borderRadius:
                  m.role === "user"
                    ? "16px 16px 4px 16px"
                    : "16px 16px 16px 4px",
                background:
                  m.role === "user"
                    ? "rgba(201,168,76,0.15)"
                    : "rgba(255,255,255,0.04)",
                border: `1px solid ${m.role === "user" ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.08)"}`,
                fontFamily: "'EB Garamond', serif",
                fontSize: "13.5px",
                color: m.role === "user" ? "#e8d5a3" : "rgba(232,213,163,0.8)",
                lineHeight: 1.7,
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(201,168,76,0.15)",
                border: "1px solid rgba(201,168,76,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
              }}
            >
              ✦
            </div>
            <div
              style={{
                display: "flex",
                gap: "4px",
                padding: "12px 14px",
                background: "rgba(255,255,255,0.04)",
                borderRadius: "16px 16px 16px 4px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#c9a84c",
                    opacity: 0.6,
                    animation: `pulse 1.2s ${i * 0.3}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div
        style={{
          padding: "12px 16px 20px",
          borderTop: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask about a sermon, letter, or saying..."
            rows={1}
            style={{
              flex: 1,
              padding: "12px 14px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: "12px",
              color: "#e8d5a3",
              fontFamily: "'EB Garamond', serif",
              fontSize: "14px",
              resize: "none",
              outline: "none",
              lineHeight: 1.5,
            }}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              background: input.trim()
                ? "rgba(201,168,76,0.2)"
                : "rgba(255,255,255,0.04)",
              border: `1px solid ${input.trim() ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.08)"}`,
              color: input.trim() ? "#c9a84c" : "rgba(255,255,255,0.2)",
              cursor: input.trim() ? "pointer" : "default",
              fontSize: "16px",
              transition: "all 0.2s",
              flexShrink: 0,
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIChatMode;
