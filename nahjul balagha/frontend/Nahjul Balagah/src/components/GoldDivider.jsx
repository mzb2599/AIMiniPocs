import React from "react";

const GoldDivider = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      margin: "12px 0",
    }}
  >
    <div
      style={{
        flex: 1,
        height: "1px",
        background: "linear-gradient(to right, transparent, #c9a84c)",
      }}
    />
    <span style={{ color: "#c9a84c", fontSize: "10px" }}>✦</span>
    <div
      style={{
        flex: 1,
        height: "1px",
        background: "linear-gradient(to left, transparent, #c9a84c)",
      }}
    />
  </div>
);

export default GoldDivider;
