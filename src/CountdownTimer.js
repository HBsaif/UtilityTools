import React, { useState, useRef, useEffect } from 'react';

function CountdownTimer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showTimeUpMessage, setShowTimeUpMessage] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(prevSeconds => prevSeconds - 1);
        } else if (minutes > 0) {
          setMinutes(prevMinutes => prevMinutes - 1);
          setSeconds(59);
        } else {
          clearInterval(timerRef.current);
          setIsRunning(false);
          setShowTimeUpMessage(true);
        }
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [minutes, seconds, isRunning]);

  const startTimer = () => {
    if (minutes === 0 && seconds === 0) return;
    setIsRunning(true);
    setShowTimeUpMessage(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setMinutes(0);
    setSeconds(0);
  };

  const formatTime = (num) => String(num).padStart(2, '0');

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">Countdown Timer</h5>
        <div className="mb-3 d-flex justify-content-center align-items-center">
          <input
            type="number"
            className="form-control text-center mx-1"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
            min="0"
            max="59"
            disabled={isRunning}
            style={{ width: '80px' }}
          />
          :
          <input
            type="number"
            className="form-control text-center mx-1"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
            min="0"
            max="59"
            disabled={isRunning}
            style={{ width: '80px' }}
          />
        </div>
        <div className="text-center mb-3">
          <h3 className="display-4">{formatTime(minutes)}:{formatTime(seconds)}</h3>
        </div>
        <div className="d-grid gap-2">
          {!isRunning ? (
            <button className="btn btn-custom" onClick={startTimer}>Start</button>
          ) : (
            <button className="btn btn-custom" onClick={stopTimer}>Stop</button>
          )}
          <button className="btn btn-secondary" onClick={resetTimer}>Reset</button>
        </div>
        {showTimeUpMessage && (
          <div className="alert alert-success mt-3" role="alert">
            Time's up! <i className="fas fa-bell"></i>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowTimeUpMessage(false)}></button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountdownTimer;
