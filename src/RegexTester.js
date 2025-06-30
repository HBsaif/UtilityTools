import React, { useState, useEffect } from 'react';

function RegexTester() {
  const [regexPattern, setRegexPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [matchResults, setMatchResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    testRegex();
  }, [regexPattern, testString]);

  const testRegex = () => {
    setError('');
    setMatchResults([]);

    if (!regexPattern) {
      return;
    }

    try {
      const regex = new RegExp(regexPattern, 'g'); // 'g' for global matches
      const results = [];
      let match;
      while ((match = regex.exec(testString)) !== null) {
        results.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
        });
      }
      setMatchResults(results);
    } catch (e) {
      setError('Invalid Regex: ' + e.message);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Regex Tester</h5>
        <div className="mb-3">
          <label htmlFor="regexPattern" className="form-label">Regular Expression:</label>
          <input
            type="text"
            className="form-control"
            id="regexPattern"
            value={regexPattern}
            onChange={(e) => setRegexPattern(e.target.value)}
            placeholder="e.g., \d{3}-\d{2}-\d{4}"
          />
          {error && <div className="alert alert-danger mt-2">{error}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="testString" className="form-label">Test String:</label>
          <textarea
            className="form-control"
            id="testString"
            rows="5"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against the regex"
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Matches:</label>
          {matchResults.length === 0 && !error && <p>No matches found.</p>}
          {matchResults.length > 0 && (
            <ul className="list-group">
              {matchResults.map((result, index) => (
                <li key={index} className="list-group-item">
                  <strong>Match:</strong> "{result.match}" (Index: {result.index})
                  {result.groups.length > 0 && (
                    <div>
                      <strong>Groups:</strong> {JSON.stringify(result.groups)}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegexTester;
