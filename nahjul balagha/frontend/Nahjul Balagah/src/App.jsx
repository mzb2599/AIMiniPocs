import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NahjulBalagha from "./NahjulBalagah";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NahjulBalagha />
    </>
  );
}

export default App;
