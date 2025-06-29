import React, { useState } from 'react';

function TipCalculator() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [numPeople, setNumPeople] = useState(1);
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountPerPerson, setAmountPerPerson] = useState(0);

  const calculateTip = () => {
    const bill = parseFloat(billAmount);
    if (isNaN(bill) || bill <= 0) {
      alert('Please enter a valid bill amount.');
      return;
    }

    const tip = bill * (tipPercentage / 100);
    const total = bill + tip;
    const perPerson = total / numPeople;

    setTipAmount(tip.toFixed(2));
    setTotalAmount(total.toFixed(2));
    setAmountPerPerson(perPerson.toFixed(2));
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">Tip Calculator</h5>
        <div className="mb-3">
          <label className="form-label">Bill Amount ($)</label>
          <input type="number" className="form-control" value={billAmount} onChange={(e) => setBillAmount(e.target.value)} placeholder="e.g., 50.00" />
        </div>
        <div className="mb-3">
          <label className="form-label">Tip Percentage ({tipPercentage}%)</label>
          <input type="range" className="form-range" min="0" max="30" value={tipPercentage} onChange={(e) => setTipPercentage(parseInt(e.target.value))} />
        </div>
        <div className="mb-3">
          <label className="form-label">Number of People</label>
          <input type="number" className="form-control" value={numPeople} onChange={(e) => setNumPeople(parseInt(e.target.value))} min="1" />
        </div>
        <button className="btn btn-custom" onClick={calculateTip}>Calculate Tip</button>

        {tipAmount > 0 && (
          <div className="mt-3">
            <p className="form-control">Tip Amount: ${tipAmount}</p>
            <p className="form-control">Total Amount: ${totalAmount}</p>
            <p className="form-control">Amount per Person: ${amountPerPerson}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TipCalculator;
