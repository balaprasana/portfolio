import React, { useState, useEffect, useRef } from "react";
import "./Stopwatch.css";

export default function Stopwatch() {
  const [time, setTime] = useState(0); // in ms
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  // convert ms → minutes:seconds:ms
  const formatTime = (ms) => {
    const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
    const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
    const milliseconds = String(ms % 1000).padStart(3, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  // calculate angles for clock hands
  const sec = (time / 1000) % 60;
  const ms = (time % 1000) / 1000;

  const secondAngle = (sec / 60) * 360; // red
  const milliAngle = ms * 360; // black
  const quarterAngle = ((sec * 1000 + (time % 1000)) / 60000) * 360; // blue (extra hand)

  return (
    <div className="stopwatch-container">
      <div className="dial">
        {/* --- New Clock Indices/Numbers --- */}
        {/*
          These div elements correspond to the .index styles in the CSS.
          We use absolute positioning to place them on the dial.
        */}
        <div className="index index-60">60</div>
        <div className="index index-05">05</div>
        <div className="index index-10">10</div>
        <div className="index index-15">15</div>
        <div className="index index-20">20</div>
        <div className="index index-25">25</div>
        <div className="index index-30">30</div>
        <div className="index index-35">35</div>
        {/* You can add more indices here if you want more numbers visible */}
        
        {/* Existing Hands */}
        <div
          className="hand red"
          style={{ transform: `rotate(${secondAngle}deg)` }}
        />
        <div
          className="hand blue"
          style={{ transform: `rotate(${quarterAngle}deg)` }}
        />
        <div
          className="hand black"
          style={{ transform: `rotate(${milliAngle}deg)` }}
        />
      </div>

      <div className="time-display">{formatTime(time)}</div>

      <div className="controls">
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}