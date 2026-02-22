import React from "react";

const ArabicPattern = () => (
  <svg
    width="100%"
    height="60"
    viewBox="0 0 400 60"
    style={{ opacity: 0.07, position: "absolute", top: 0, left: 0 }}
  >
    <defs>
      <pattern
        id="geom"
        x="0"
        y="0"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
      >
        <polygon
          points="20,2 38,12 38,28 20,38 2,28 2,12"
          fill="none"
          stroke="#c9a84c"
          strokeWidth="0.8"
        />
        <polygon
          points="20,8 32,15 32,25 20,32 8,25 8,15"
          fill="none"
          stroke="#c9a84c"
          strokeWidth="0.5"
        />
      </pattern>
    </defs>
    <rect width="400" height="60" fill="url(#geom)" />
  </svg>
);

export default ArabicPattern;
