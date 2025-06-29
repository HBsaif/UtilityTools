import React, { useState } from 'react';

function WordCounter() {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);

  const analyzeText = () => {
    const words = text.trim().split(/\s+/).filter(word => word !== '');
    setWordCount(words.length);
    setCharCount(text.length);
    setSentenceCount((text.match(/[^.!?]*[.!?]/g) || []).length);
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">Word Counter</h5>
        <div className="mb-3">
          <label className="form-label">Enter Text</label>
          <textarea className="form-control" rows="5" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type something here..."></textarea>
        </div>
        <button className="btn btn-custom" onClick={analyzeText}>Analyze Text</button>
        <div className="mt-3">
          <p className="form-control">Word Count: <strong>{wordCount}</strong></p>
          <p className="form-control">Character Count: <strong>{charCount}</strong></p>
          <p className="form-control">Sentence Count: <strong>{sentenceCount}</strong></p>
        </div>
      </div>
    </div>
  );
}

export default WordCounter;
