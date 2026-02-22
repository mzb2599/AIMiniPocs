import React from "react";
import GoldDivider from "./GoldDivider";

function DetailModal({ item, onClose }) {
  if (!item) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(5,5,10,0.92)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "linear-gradient(160deg, #0d0a07 0%, #12100a 100%)",
          border: "1px solid rgba(201,168,76,0.3)",
          borderBottom: "none",
          borderRadius: "24px 24px 0 0",
          padding: "32px 24px 40px",
          maxHeight: "82vh",
          overflowY: "auto",
          animation: "slideUp 0.3s ease",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div
            style={{
              width: "48px",
              height: "3px",
              background: "rgba(201,168,76,0.4)",
              borderRadius: "2px",
              margin: "0 auto 16px",
            }}
          />
          <div
            style={{
              fontFamily: "'Cinzel Decorative', serif",
              fontSize: "11px",
              color: "#c9a84c",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Nahjul Balagah
          </div>
          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              color: "#e8d5a3",
              fontSize: "17px",
              fontWeight: 600,
              margin: 0,
            }}
          >
            {item.title}
          </h2>
        </div>
        <GoldDivider />
        {item.arabic && (
          <div
            style={{
              fontFamily: "'Amiri', serif",
              fontSize: "20px",
              color: "#c9a84c",
              textAlign: "right",
              direction: "rtl",
              lineHeight: 2.2,
              margin: "16px 0",
              padding: "16px",
              background: "rgba(201,168,76,0.05)",
              borderRadius: "8px",
              border: "1px solid rgba(201,168,76,0.1)",
            }}
          >
            {item.arabic}
          </div>
        )}
        <GoldDivider />
        <p
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: "15px",
            color: "rgba(232,213,163,0.8)",
            lineHeight: 1.9,
            fontStyle: "italic",
            margin: "16px 0",
          }}
        >
          {item.text || item.excerpt}
        </p>
        <button
          onClick={onClose}
          style={{
            width: "100%",
            marginTop: "16px",
            padding: "14px",
            background: "rgba(201,168,76,0.12)",
            border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: "10px",
            color: "#c9a84c",
            fontFamily: "'Cinzel', serif",
            fontSize: "12px",
            letterSpacing: "2px",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default DetailModal;
