import React, { useState } from 'react';

function TimestampConverter() {
  const [timestampInput, setTimestampInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [convertedOutput, setConvertedOutput] = useState('');
  const [error, setError] = useState('');

  const convertTimestampToDate = () => {
    setError('');
    setConvertedOutput('');
    if (!timestampInput) {
      setError('Please enter a timestamp.');
      return;
    }
    const timestamp = parseInt(timestampInput, 10);
    if (isNaN(timestamp)) {
      setError('Invalid timestamp. Please enter a numeric value.');
      return;
    }

    // Assume milliseconds if timestamp is very large (common for JS timestamps)
    // Otherwise, assume seconds and convert to milliseconds
    const date = new Date(timestampInput.length === 10 ? timestamp * 1000 : timestamp);
    
    if (isNaN(date.getTime())) {
      setError('Invalid timestamp. Could not convert to a valid date.');
      return;
    }
    setConvertedOutput(date.toLocaleString());
  };

  const convertDateToTimestamp = () => {
    setError('');
    setConvertedOutput('');
    if (!dateInput) {
      setError('Please enter a date/time string.');
      return;
    }
    try {
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) {
        setError('Invalid date/time string. Please use a recognized format.');
        return;
      }
      setConvertedOutput(date.getTime().toString()); // Milliseconds timestamp
    } catch (e) {
      setError('Error converting date: ' + e.message);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Timestamp Converter</h5>
        <div className="mb-3">
          <label htmlFor="timestampInput" className="form-label">Timestamp to Date:</label>
          <input
            type="text"
            className="form-control"
            id="timestampInput"
            value={timestampInput}
            onChange={(e) => setTimestampInput(e.target.value)}
            placeholder="e.g., 1678886400000 (ms) or 1678886400 (s)"
          />
          <button className="btn btn-primary mt-2" onClick={convertTimestampToDate}>Convert to Date</button>
        </div>
        <div className="mb-3">
          <label htmlFor="dateInput" className="form-label">Date to Timestamp:</label>
          <input
            type="text"
            className="form-control"
            id="dateInput"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            placeholder="e.g., 2023-03-15T10:00:00Z or March 15, 2023 10:00:00"
          />
          <button className="btn btn-primary mt-2" onClick={convertDateToTimestamp}>Convert to Timestamp</button>
        </div>
        <div className="mb-3">
          <label htmlFor="convertedOutput" className="form-label">Output:</label>
          <textarea
            className="form-control"
            id="convertedOutput"
            rows="3"
            value={convertedOutput}
            readOnly
            placeholder="Converted value will appear here"
          ></textarea>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
}

export default TimestampConverter;
