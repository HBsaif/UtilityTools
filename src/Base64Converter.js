import React, { useState } from 'react';

function Base64Converter() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [error, setError] = useState('');

  const encodeBase64 = () => {
    try {
      setError('');
      setOutputText(btoa(inputText));
    } catch (e) {
      setError('Error encoding: ' + e.message);
      setOutputText('');
    }
  };

  const decodeBase64 = () => {
    try {
      setError('');
      setOutputText(atob(inputText));
    } catch (e) {
      setError('Error decoding: ' + e.message);
      setOutputText('');
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Base64 Encoder/Decoder</h5>
        <div className="mb-3">
          <label htmlFor="base64Input" className="form-label">Input Text:</label>
          <textarea
            className="form-control"
            id="base64Input"
            rows="5"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to encode or decode"
          ></textarea>
        </div>
        <div className="d-grid gap-2 mb-3">
          <button className="btn btn-primary" onClick={encodeBase64}>Encode</button>
          <button className="btn btn-secondary" onClick={decodeBase64}>Decode</button>
        </div>
        <div className="mb-3">
          <label htmlFor="base64Output" className="form-label">Output Text:</label>
          <textarea
            className="form-control"
            id="base64Output"
            rows="5"
            value={outputText}
            readOnly
            placeholder="Encoded or decoded output will appear here"
          ></textarea>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
}

export default Base64Converter;
