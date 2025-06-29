import React, { useState } from 'react';

function RandomNumberGenerator() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [randomNumber, setRandomNumber] = useState(null);

  const generateNumber = () => {
    const minVal = parseInt(min);
    const maxVal = parseInt(max);

    if (isNaN(minVal) || isNaN(maxVal)) {
      alert('Please enter valid numbers for min and max.');
      return;
    }

    if (minVal >= maxVal) {
      alert('Min value must be less than Max value.');
      return;
    }

    const num = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
    setRandomNumber(num);
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">Random Number Generator</h5>
        <div className="mb-3">
          <label className="form-label">Min Value</label>
          <input type="number" className="form-control" value={min} onChange={(e) => setMin(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Max Value</label>
          <input type="number" className="form-control" value={max} onChange={(e) => setMax(e.target.value)} />
        </div>
        <button className="btn btn-custom" onClick={generateNumber}>Generate Number</button>
        {randomNumber !== null && (
          <div className="mt-3">
            <p className="form-control">Generated Number: <strong>{randomNumber}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RandomNumberGenerator;
