import React, { useState, useRef } from 'react';

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  const startStopwatch = () => {
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
  };

  const stopStopwatch = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setTime(0);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return (
      String(minutes).padStart(2, '0') + ':' +
      String(seconds).padStart(2, '0') + ':' +
      String(milliseconds).padStart(2, '0')
    );
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">Stopwatch</h5>
        <div className="text-center mb-3">
          <h3 className="display-4">{formatTime(time)}</h3>
        </div>
        <div className="d-grid gap-2">
          {!isRunning ? (
            <button className="btn btn-custom" onClick={startStopwatch}>Start</button>
          ) : (
            <button className="btn btn-custom" onClick={stopStopwatch}>Stop</button>
          )}
          <button className="btn btn-secondary" onClick={resetStopwatch}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
