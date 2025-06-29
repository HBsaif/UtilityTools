import React, { useState } from 'react';

function UrlShortener() {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const shortenUrl = async () => {
    if (longUrl.trim() === '') {
      setError('Please enter a URL.');
      return;
    }

    setLoading(true);
    setError(null);
    setCopied(false);

    try {
      const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`);
      const data = await response.json();
      if (data.shorturl) {
        setShortUrl(data.shorturl);
      } else {
        setError(data.errormessage || 'An unknown error occurred.');
      }
    } catch (err) {
      setError('Failed to shorten URL. Please check your internet connection.');
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">URL Shortener</h5>
        <div className="mb-3">
          <label className="form-label">Long URL</label>
          <input type="text" className="form-control" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} placeholder="Enter your long URL" />
        </div>
        <button className="btn btn-custom" onClick={shortenUrl} disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
        {shortUrl && (
          <div className="mt-3 input-group">
            <input type="text" className="form-control" value={shortUrl} readOnly />
            <button className="btn btn-outline-secondary" type="button" onClick={copyToClipboard}>
              {copied ? <i className="fas fa-check"></i> : <i className="fas fa-copy"></i>}
            </button>
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default UrlShortener;