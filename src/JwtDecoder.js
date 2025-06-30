import React, { useState } from 'react';

function JwtDecoder() {
  const [jwtToken, setJwtToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  const decodeJwt = () => {
    setError('');
    setHeader('');
    setPayload('');
    setSignature('');

    if (!jwtToken) {
      setError('Please enter a JWT token.');
      return;
    }

    try {
      const parts = jwtToken.split('.');
      if (parts.length !== 3) {
        setError('Invalid JWT token format. A JWT must have 3 parts separated by dots.');
        return;
      }

      const decodedHeader = JSON.stringify(JSON.parse(atob(parts[0])), null, 2);
      const decodedPayload = JSON.stringify(JSON.parse(atob(parts[1])), null, 2);

      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setSignature(parts[2]); // Signature is not decoded, just displayed

    } catch (e) {
      setError('Error decoding JWT: ' + e.message);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">JWT Decoder</h5>
        <div className="mb-3">
          <label htmlFor="jwtInput" className="form-label">JWT Token:</label>
          <textarea
            className="form-control"
            id="jwtInput"
            rows="3"
            value={jwtToken}
            onChange={(e) => setJwtToken(e.target.value)}
            placeholder="Enter your JWT token here"
          ></textarea>
        </div>
        <div className="d-grid gap-2 mb-3">
          <button className="btn btn-primary" onClick={decodeJwt}>Decode JWT</button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {header && (
          <div className="mb-3">
            <label className="form-label">Header:</label>
            <textarea className="form-control" rows="5" value={header} readOnly></textarea>
          </div>
        )}
        {payload && (
          <div className="mb-3">
            <label className="form-label">Payload:</label>
            <textarea className="form-control" rows="10" value={payload} readOnly></textarea>
          </div>
        )}
        {signature && (
          <div className="mb-3">
            <label className="form-label">Signature:</label>
            <textarea className="form-control" rows="2" value={signature} readOnly></textarea>
          </div>
        )}
      </div>
    </div>
  );
}

export default JwtDecoder;
