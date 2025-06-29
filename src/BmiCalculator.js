import React, { useState } from 'react';

function BmiCalculator() {
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBmi = () => {
    if (!feet || !weight) return;
    const totalInches = (parseInt(feet) * 12) + parseInt(inches || 0);
    const heightInMeters = totalInches * 0.0254;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">BMI Calculator</h5>
        <div className="row g-3 mb-3">
          <div className="col">
            <label>Height (feet)</label>
            <input type="number" className="form-control" value={feet} onChange={(e) => setFeet(e.target.value)} />
          </div>
          <div className="col">
            <label>Height (inches)</label>
            <input type="number" className="form-control" value={inches} onChange={(e) => setInches(e.target.value)} />
          </div>
        </div>
        <div className="mb-3">
          <label>Weight (kg)</label>
          <input type="number" className="form-control" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <button className="btn btn-custom" onClick={calculateBmi}>Calculate BMI</button>
        {bmi && (
          <div className="mt-3">
            <h4>Your BMI: {bmi}</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default BmiCalculator;
