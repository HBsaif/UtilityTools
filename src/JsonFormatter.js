import React, { useState } from 'react';
import ErrorModal from './ErrorModal'; // Import the new ErrorModal component

function JsonFormatter() {
  const [jsonInput, setJsonInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false); // State for modal visibility

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setError(''); // Clear error when modal is closed
  };

  const displayError = (message) => {
    setError(message);
    setShowErrorModal(true);
  };

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
      displayError('Invalid JSON: ' + e.message);
    }
  };

  const validateJson = () => {
    setError('');
    setJsonOutput('');
    if (!jsonInput) {
      displayError('Please enter JSON to validate.');
      return;
    }
    try {
      JSON.parse(jsonInput);
      setJsonOutput('JSON is valid!');
    } catch (e) {
      displayError('Invalid JSON: ' + e.message);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">JSON Formatter & Validator</h5>
        <div className="row">
          <div className="col-md-5">
            <div className="mb-3">
              <label htmlFor="jsonInput" className="form-label">JSON Input:</label>
              <textarea
                className="form-control"
                id="jsonInput"
                rows="15"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder="Enter JSON here"
              ></textarea>
            </div>
          </div>
          <div className="col-md-2 d-flex flex-column justify-content-center align-items-center">
            <button className="btn btn-primary mb-2 json-tool-btn" onClick={formatJson}>Format</button>
            <button className="btn btn-secondary json-tool-btn" onClick={validateJson}>Validate</button>
          </div>
          <div className="col-md-5">
            <div className="mb-3">
              <label htmlFor="jsonOutput" className="form-label">Output:</label>
              <textarea
                className="form-control"
                id="jsonOutput"
                rows="15"
                value={jsonOutput}
                readOnly
                placeholder="Formatted JSON or validation message will appear here"
              ></textarea>
            </div>
          </div>
        </div>
        {/* Replace alert with ErrorModal */}
        <ErrorModal show={showErrorModal} handleClose={handleCloseErrorModal} message={error} />
      </div>
    </div>
  );
}

export default JsonFormatter;