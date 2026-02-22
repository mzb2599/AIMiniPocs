import React, { useState } from "react";
import GoldDivider from "./GoldDivider";

function ContentCard({ item, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onClick(item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "rgba(201,168,76,0.08)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.15)"}`,
        borderRadius: "12px",
        padding: "18px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.4)" : "none",
        marginBottom: "12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "60px",
          height: "60px",
          overflow: "hidden",
          opacity: 0.3,
        }}
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            border: "1px solid #c9a84c",
            position: "absolute",
            top: "-50px",
            right: "-50px",
          }}
        />
      </div>
      <div
        style={{
          fontFamily: "'Amiri', serif",
          fontSize: "14px",
          color: "#c9a84c",
          textAlign: "right",
          marginBottom: "8px",
          lineHeight: 1.8,
          direction: "rtl",
        }}
      >
        {item.arabic}
      </div>
      <GoldDivider />
      <div
        style={{
          fontFamily: "'Cinzel', serif",
          fontSize: "12px",
          color: "#e8d5a3",
          fontWeight: 600,
          marginBottom: "6px",
          letterSpacing: "0.5px",
        }}
      >
        {item.title}
      </div>
      <div
        style={{
          fontFamily: "'EB Garamond', serif",
          fontSize: "13px",
          color: "rgba(232,213,163,0.65)",
          lineHeight: 1.6,
          fontStyle: "italic",
        }}
      >
        {item.excerpt &&
          (item.excerpt.length > 100
            ? item.excerpt.slice(0, 100) + "..."
            : item.excerpt)}
      </div>
    </div>
  );
}

export default ContentCard;
