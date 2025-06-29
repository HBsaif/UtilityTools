
import React, { useState } from 'react';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (e) => {
    setInput(input + e.target.name);
  };

  const clear = () => {
    setInput('');
    setResult('');
  };

  const calculate = () => {
    try {
      setResult(eval(input).toString());
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">Calculator</h5>
        <div className="calculator-display input mb-3">
          {input}
        </div>
        <div className="calculator-display result mb-3">
          {result}
        </div>
        <div className="calculator-grid">
          <button className="btn btn-custom btn-calculator" name="1" onClick={handleClick}>1</button>
          <button className="btn btn-custom btn-calculator" name="2" onClick={handleClick}>2</button>
          <button className="btn btn-custom btn-calculator" name="3" onClick={handleClick}>3</button>
          <button className="btn btn-custom btn-calculator-operator" name="+" onClick={handleClick}>+</button>

          <button className="btn btn-custom btn-calculator" name="4" onClick={handleClick}>4</button>
          <button className="btn btn-custom btn-calculator" name="5" onClick={handleClick}>5</button>
          <button className="btn btn-custom btn-calculator" name="6" onClick={handleClick}>6</button>
          <button className="btn btn-custom btn-calculator-operator" name="-" onClick={handleClick}>-</button>

          <button className="btn btn-custom btn-calculator" name="7" onClick={handleClick}>7</button>
          <button className="btn btn-custom btn-calculator" name="8" onClick={handleClick}>8</button>
          <button className="btn btn-custom btn-calculator" name="9" onClick={handleClick}>9</button>
          <button className="btn btn-custom btn-calculator-operator" name="*" onClick={handleClick}>*</button>

          <button className="btn btn-custom btn-calculator" name="0" onClick={handleClick}>0</button>
          <button className="btn btn-custom btn-calculator-clear" onClick={clear}>C</button>
          <button className="btn btn-custom btn-calculator-equals" onClick={calculate}>=</button>
          <button className="btn btn-custom btn-calculator-operator" name="/" onClick={handleClick}>/</button>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
