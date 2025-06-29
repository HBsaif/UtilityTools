
import React, { useState } from 'react';

function Converter() {
  const [category, setCategory] = useState('temperature');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const conversions = {
    temperature: {
      celsius: {
        fahrenheit: (c) => (c * 9/5) + 32,
        kelvin: (c) => c + 273.15,
      },
      fahrenheit: {
        celsius: (f) => (f - 32) * 5/9,
        kelvin: (f) => (f - 32) * 5/9 + 273.15,
      },
      kelvin: {
        celsius: (k) => k - 273.15,
        fahrenheit: (k) => (k - 273.15) * 9/5 + 32,
      },
    },
    length: {
      meters: {
        kilometers: (m) => m / 1000,
        miles: (m) => m / 1609.34,
      },
      kilometers: {
        meters: (km) => km * 1000,
        miles: (km) => km / 1.609,
      },
      miles: {
        meters: (mi) => mi * 1609.34,
        kilometers: (mi) => mi * 1.609,
      },
    },
  };

  const handleConvert = () => {
    if (input === '') return;
    const convertedValue = conversions[category][fromUnit][toUnit](parseFloat(input));
    setResult(convertedValue.toFixed(2));
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">Converter</h5>
        <div className="mb-3">
          <select className="form-select form-control" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="temperature">Temperature</option>
            <option value="length">Length</option>
          </select>
        </div>
        <div className="row">
          <div className="col">
            <select className="form-select form-control" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
              {Object.keys(conversions[category]).map(unit => <option key={unit} value={unit}>{unit}</option>)}
            </select>
          </div>
          <div className="col">
            <select className="form-select form-control" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
              {Object.keys(conversions[category]).map(unit => <option key={unit} value={unit}>{unit}</option>)}
            </select>
          </div>
        </div>
        <div className="mt-3">
          <input type="number" className="form-control" value={input} onChange={(e) => setInput(e.target.value)} />
        </div>
        <button className="btn btn-custom mt-3" onClick={handleConvert}>Convert</button>
        <div className="mt-3">
          <input type="text" className="form-control" value={result} readOnly />
        </div>
      </div>
    </div>
  );
}

export default Converter;
