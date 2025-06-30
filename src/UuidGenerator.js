import React, { useState } from 'react';

function UuidGenerator() {
  const [uuidCount, setUuidCount] = useState(1);
  const [uuids, setUuids] = useState([]);

  const generateUuid = () => {
    const generated = [];
    for (let i = 0; i < uuidCount; i++) {
      generated.push(crypto.randomUUID());
    }
    setUuids(generated);
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">UUID Generator</h5>
        <div className="mb-3">
          <label htmlFor="uuidCount" className="form-label">Number of UUIDs to generate:</label>
          <input
            type="number"
            className="form-control"
            id="uuidCount"
            min="1"
            max="100"
            value={uuidCount}
            onChange={(e) => setUuidCount(Math.max(1, Math.min(100, parseInt(e.target.value))))}
          />
        </div>
        <div className="d-grid gap-2 mb-3">
          <button className="btn btn-primary" onClick={generateUuid}>Generate UUID(s)</button>
        </div>
        {uuids.length > 0 && (
          <div className="mb-3">
            <label className="form-label">Generated UUIDs:</label>
            <textarea
              className="form-control"
              rows="10"
              value={uuids.join('\n')}
              readOnly
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
}

export default UuidGenerator;
