import React, { useState } from 'react';

function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  const generatePassword = () => {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}\|:<>?,./';

    let allChars = lower;
    if (includeUppercase) allChars += upper;
    if (includeNumbers) allChars += numbers;
    if (includeSymbols) allChars += symbols;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    setPassword(generatedPassword);
    setIsCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">Password Generator</h5>
        <div className="mb-3">
          <label>Length: {length}</label>
          <input type="range" className="form-range" min="8" max="32" value={length} onChange={(e) => setLength(e.target.value)} />
        </div>
        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} />
          <label className="form-check-label">Include Uppercase</label>
        </div>
        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
          <label className="form-check-label">Include Numbers</label>
        </div>
        <div className="form-check mb-3">
          <input type="checkbox" className="form-check-input" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
          <label className="form-check-label">Include Symbols</label>
        </div>
        <button className="btn btn-custom" onClick={generatePassword}>Generate Password</button>
        {password && (
          <div className="mt-3 input-group">
            <input type="text" className="form-control" value={password} readOnly />
            <button className="btn btn-outline-secondary" type="button" onClick={handleCopy}>
              {isCopied ? <i className="fas fa-check"></i> : <i className="fas fa-copy"></i>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PasswordGenerator;
