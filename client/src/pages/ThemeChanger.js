import React, { useState, useContext, useEffect, useReducer } from "react";
import { Data } from "../Context";
import { useNavigate } from "react-router-dom";
import "../cssForPages/join.css";

export default function ThemeChanger() {
  const modes = [
    "light-mode",
    "checkers",
    "rain",
    "dark-mode",
    "dot",
  ];

  const [currentModeIndex, setCurrentModeIndex] = useState(0);

  const toggleMode = () => {
    const nextModeIndex = (currentModeIndex + 1) % modes.length; 
    setCurrentModeIndex(nextModeIndex);

    document.body.classList.remove(...modes);
    document.body.classList.add(modes[nextModeIndex]);
  };

  return (
    <>
      <div>
        <h1>Change Body CSS with React</h1>
        <p>Current Mode: {modes[currentModeIndex]}</p>
        <button onClick={toggleMode}>Switch Mode</button>
      </div>
    </>
  );
}
