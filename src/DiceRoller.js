import React, { useState } from 'react';

function DiceRoller() {
  const [numDice, setNumDice] = useState(1);
  const [numSides, setNumSides] = useState(6);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState(0);

  const rollDice = () => {
    const newResults = [];
    let newTotal = 0;
    for (let i = 0; i < numDice; i++) {
      const roll = Math.floor(Math.random() * numSides) + 1;
      newResults.push(roll);
      newTotal += roll;
    }
    setResults(newResults);
    setTotal(newTotal);
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">Dice Roller</h5>
        <div className="mb-3">
          <label className="form-label">Number of Dice</label>
          <input type="number" className="form-control" value={numDice} onChange={(e) => setNumDice(parseInt(e.target.value))} min="1" />
        </div>
        <div className="mb-3">
          <label className="form-label">Number of Sides (e.g., 6 for D6)</label>
          <input type="number" className="form-control" value={numSides} onChange={(e) => setNumSides(parseInt(e.target.value))} min="2" />
        </div>
        <button className="btn btn-custom" onClick={rollDice}>Roll Dice</button>

        {results.length > 0 && (
          <div className="mt-3">
            <p className="form-control">Results: {results.join(', ')}</p>
            <p className="form-control">Total: {total}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiceRoller;
