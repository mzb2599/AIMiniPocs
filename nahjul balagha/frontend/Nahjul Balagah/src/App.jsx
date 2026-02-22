import { useState, useEffect } from "react";
import ContentCard from "./components/ContentCard";
import DetailModal from "./components/DetailModal";
import AIChatMode from "./components/AIChatMode";
import GoldDivider from "./components/GoldDivider";
import ArabicPattern from "./components/ArabicPattern";

const tabs = [
  { id: "sermons", label: "Sermons", icon: "🕌", arabic: "خُطَب" },
  { id: "letters", label: "Letters", icon: "📜", arabic: "رَسَائِل" },
  { id: "sayings", label: "Sayings", icon: "💎", arabic: "حِكَم" },
  { id: "ai", label: "AI Mode", icon: "✦", arabic: "ذَكَاء" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("sermons");
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [error, setError] = useState(null);

  // fetch data when tab changes
  useEffect(() => {
    if (activeTab === "ai") return;
    setLoadingItems(true);
    setError(null);
    setItems([]); // drop previous results immediately so we don't flash wrong cards
    const base = import.meta.env.VITE_API_URL || "/api";
    fetch(`${base}/${activeTab}`)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status}`);
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoadingItems(false));
  }, [activeTab]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@400;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #08060a; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.3); border-radius: 2px; }

        textarea::placeholder { color: rgba(201,168,76,0.3); }
        textarea:focus { border-color: rgba(201,168,76,0.5) !important; }

        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(40px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes shimmer { 0%,100% { opacity: 0.4 } 50% { opacity: 1 } }
        @keyframes pulse { 0%,100% { transform: scale(0.8); opacity: 0.4 } 50% { transform: scale(1.1); opacity: 1 } }
        @keyframes starFloat { 0%,100% { transform: translateY(0px) } 50% { transform: translateY(-8px) } }
        @keyframes borderGlow { 0%,100% { box-shadow: 0 0 0px rgba(201,168,76,0.2) } 50% { box-shadow: 0 0 20px rgba(201,168,76,0.15) } }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(ellipse at 20% 0%, #1a1208 0%, #0a080d 40%, #060409 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "16px 0",
        }}
      >
        {/* Phone Frame */}
        <div
          style={{
            width: "100%",
            maxWidth: "390px",
            minHeight: "844px",
            background: "linear-gradient(160deg, #0d0b08 0%, #0a0910 100%)",
            borderRadius: "40px",
            border: "1px solid rgba(201,168,76,0.2)",
            boxShadow:
              "0 32px 80px rgba(0,0,0,0.8), 0 0 0 6px #0a0810, 0 0 0 7px rgba(201,168,76,0.1)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            animation: "borderGlow 4s ease infinite",
          }}
        >
          {/* Status Bar */}
          <div
            style={{
              padding: "12px 24px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "10px",
                color: "rgba(201,168,76,0.5)",
              }}
            >
              9:41
            </span>
            <div
              style={{
                width: "100px",
                height: "20px",
                background: "#000",
                borderRadius: "10px",
              }}
            />
            <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
              {[3, 5, 7].map((h) => (
                <div
                  key={h}
                  style={{
                    width: "3px",
                    height: `${h}px`,
                    background: "rgba(201,168,76,0.5)",
                    borderRadius: "1px",
                  }}
                />
              ))}
              <div
                style={{
                  width: "12px",
                  height: "6px",
                  border: "1px solid rgba(201,168,76,0.3)",
                  borderRadius: "2px",
                  marginLeft: "2px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "4px",
                    background: "rgba(201,168,76,0.5)",
                    borderRadius: "1px",
                    margin: "1px",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Header */}
          <div
            style={{
              padding: "20px 24px 0",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <ArabicPattern />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "4px",
                }}
              >
                <div
                  style={{
                    width: "1px",
                    height: "20px",
                    background:
                      "linear-gradient(to bottom, transparent, #c9a84c, transparent)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: "9px",
                    color: "#c9a84c",
                    letterSpacing: "4px",
                    textTransform: "uppercase",
                  }}
                >
                  Peak of Eloquence
                </span>
              </div>
              <h1
                style={{
                  fontFamily: "'Cinzel Decorative', serif",
                  fontSize: "22px",
                  color: "#e8d5a3",
                  letterSpacing: "1px",
                  lineHeight: 1.2,
                }}
              >
                Nahjul Balagah
              </h1>
              <p
                style={{
                  fontFamily: "'Amiri', serif",
                  fontSize: "16px",
                  color: "#c9a84c",
                  marginTop: "2px",
                  direction: "rtl",
                  textAlign: "left",
                }}
              >
                نَهْجُ الْبَلاغَة
              </p>
            </div>
          </div>

          <GoldDivider />

          {/* Tab Bar */}
          <div
            style={{
              display: "flex",
              padding: "0 12px",
              gap: "6px",
              marginBottom: "4px",
            }}
          >
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1,
                    padding: "10px 4px",
                    background: active
                      ? "rgba(201,168,76,0.15)"
                      : "transparent",
                    border: `1px solid ${active ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.06)"}`,
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "3px",
                  }}
                >
                  <span
                    style={{
                      fontSize: tab.id === "ai" ? "14px" : "16px",
                      color: active ? "#c9a84c" : "rgba(201,168,76,0.4)",
                      animation:
                        active && tab.id === "ai"
                          ? "shimmer 2s infinite"
                          : "none",
                    }}
                  >
                    {tab.icon}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "8px",
                      color: active ? "#e8d5a3" : "rgba(201,168,76,0.35)",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div
            style={{
              flex: 1,
              overflowY: activeTab === "ai" ? "hidden" : "auto",
              padding: activeTab === "ai" ? "0" : "8px 16px 24px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {activeTab !== "ai" && (
              <>
                {/* Section Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        fontFamily: "'Cinzel', serif",
                        fontSize: "16px",
                        color: "#e8d5a3",
                        fontWeight: 600,
                      }}
                    >
                      {tabs.find((t) => t.id === activeTab)?.label}
                    </h2>
                    <p
                      style={{
                        fontFamily: "'Amiri', serif",
                        fontSize: "13px",
                        color: "#c9a84c",
                      }}
                    >
                      {tabs.find((t) => t.id === activeTab)?.arabic}
                    </p>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "10px",
                      color: "rgba(201,168,76,0.4)",
                      padding: "4px 10px",
                      border: "1px solid rgba(201,168,76,0.15)",
                      borderRadius: "20px",
                    }}
                  >
                    {items.length} entries
                  </div>
                </div>

                {loadingItems && <p style={{ color: "#c9a84c" }}>Loading...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* Featured Quote */}
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)",
                    border: "1px solid rgba(201,168,76,0.25)",
                    borderRadius: "14px",
                    padding: "16px",
                    marginBottom: "16px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-20px",
                      right: "-20px",
                      fontSize: "80px",
                      color: "#c9a84c",
                      opacity: 0.04,
                      fontFamily: "serif",
                      lineHeight: 1,
                    }}
                  >
                    "
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: "9px",
                      color: "#c9a84c",
                      letterSpacing: "3px",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                    }}
                  >
                    ✦ Featured Wisdom ✦
                  </div>
                  <p
                    style={{
                      fontFamily: "'EB Garamond', serif",
                      fontSize: "14px",
                      color: "#e8d5a3",
                      fontStyle: "italic",
                      lineHeight: 1.8,
                    }}
                  >
                    "He who has a thousand friends has not a friend to spare,
                    and he who has one enemy will meet him everywhere."
                  </p>
                  <div
                    style={{
                      fontFamily: "'Amiri', serif",
                      fontSize: "13px",
                      color: "rgba(201,168,76,0.6)",
                      textAlign: "right",
                      direction: "rtl",
                      marginTop: "8px",
                    }}
                  >
                    — Imam Ali (AS)
                  </div>
                </div>

                {/* Cards */}
                {!loadingItems &&
                  items.map((item) => (
                    <ContentCard
                      key={item.id}
                      item={item}
                      onClick={setSelectedItem}
                    />
                  ))}
              </>
            )}

            {activeTab === "ai" && <AIChatMode />}
          </div>

          {/* Bottom Nav Bar (cosmetic) */}
          {activeTab !== "ai" && (
            <div
              style={{
                padding: "12px 40px 28px",
                borderTop: "1px solid rgba(201,168,76,0.08)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "120px",
                  height: "4px",
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "2px",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}
