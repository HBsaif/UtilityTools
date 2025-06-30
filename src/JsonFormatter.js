import React, { useState } from 'react';

function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState('');

  const formatJson = () => {
    setError('');
    setJsonOutput('');
    if (!jsonInput) {
      return;
    }
    try {
      const parsed = JSON.parse(jsonInput);
      setJsonOutput(JSON.stringify(parsed, null, 2)); // Pretty print with 2 spaces
    } catch (e) {
      setError('Invalid JSON: ' + e.message);
    }
  };

  const validateJson = () => {
    setError('');
    setJsonOutput('');
    if (!jsonInput) {
      setError('Please enter JSON to validate.');
      return;
    }
    try {
      JSON.parse(jsonInput);
      setJsonOutput('JSON is valid!');
    } catch (e) {
      setError('Invalid JSON: ' + e.message);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">JSON Formatter & Validator</h5>
        <div className="mb-3">
          <label htmlFor="jsonInput" className="form-label">JSON Input:</label>
          <textarea
            className="form-control"
            id="jsonInput"
            rows="10"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="Enter JSON here"
          ></textarea>
        </div>
        <div className="d-grid gap-2 mb-3">
          <button className="btn btn-primary" onClick={formatJson}>Format JSON</button>
          <button className="btn btn-secondary" onClick={validateJson}>Validate JSON</button>
        </div>
        <div className="mb-3">
          <label htmlFor="jsonOutput" className="form-label">Output:</label>
          <textarea
            className="form-control"
            id="jsonOutput"
            rows="10"
            value={jsonOutput}
            readOnly
            placeholder="Formatted JSON or validation message will appear here"
          ></textarea>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
}

export default JsonFormatter;
