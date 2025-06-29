import React, { useState } from 'react';

function TextReverser() {
  const [inputText, setInputText] = useState('');
  const [reversedText, setReversedText] = useState('');

  const handleReverse = () => {
    setReversedText(inputText.split('').reverse().join(''));
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">Text Reverser</h5>
        <div className="mb-3">
          <label className="form-label">Enter Text</label>
          <textarea className="form-control" rows="5" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Type something here..."></textarea>
        </div>
        <button className="btn btn-custom" onClick={handleReverse}>Reverse Text</button>
        {reversedText && (
          <div className="mt-3">
            <label className="form-label">Reversed Text</label>
            <textarea className="form-control" rows="5" value={reversedText} readOnly></textarea>
          </div>
        )}
      </div>
    </div>
  );
}

export default TextReverser;
