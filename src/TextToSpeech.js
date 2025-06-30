import React, { useState, useEffect, useRef } from 'react';

function TextToSpeech() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState('');

  const utteranceRef = useRef(null); // To keep track of the current utterance

  useEffect(() => {
    const populateVoiceList = () => {
      const availableVoices = speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Set a default voice if none is selected or if the previously selected voice is no longer available
      if (availableVoices.length > 0 && (!selectedVoice || !availableVoices.some(v => v.name === selectedVoice))) {
        // Try to find a Bengali voice first
        const bengaliVoice = availableVoices.find(v => v.lang.startsWith('bn'));
        if (bengaliVoice) {
          setSelectedVoice(bengaliVoice.name);
        } else {
          // Fallback to en-US, else first available
          setSelectedVoice(availableVoices.find(v => v.lang === 'en-US')?.name || availableVoices[0].name);
        }
      }
    };

    // Populate voices immediately and listen for changes
    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    // Fallback for browsers that might not fire onvoiceschanged immediately
    // or where getVoices() is initially empty but populates later.
    const timeoutId = setTimeout(() => {
      if (voices.length === 0) {
        populateVoiceList();
      }
    }, 500); // Try again after 500ms if no voices are found initially

    return () => {
      // Clean up event listener on component unmount
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = null;
      }
      clearTimeout(timeoutId); // Clear the timeout
      // Stop any ongoing speech when component unmounts
      speechSynthesis.cancel();
    };
  }, [selectedVoice, voices.length]); // Added voices.length to dependency array to re-run if voices change

  const speakText = () => {
    if (!text) {
      setError('Please enter some text to speak.');
      return;
    }

    if (!('speechSynthesis' in window)) {
      setError('Web Speech API is not supported in this browser.');
      return;
    }

    if (speechSynthesis.speaking) {
      speechSynthesis.cancel(); // Stop any current speech before starting new one
    }

    setError('');
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance; // Store utterance in ref

    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    } else if (voices.length > 0) {
      // Fallback to first available voice if selected voice is not found
      utterance.voice = voices[0];
      setError('Selected voice not found, using default.');
    } else {
      setError('No voices available. Please check your browser settings.');
      return;
    }

    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = volume;

    utterance.onerror = (event) => {
      setError('Speech synthesis error: ' + event.error + '. Please try again or check browser settings.');
      console.error('SpeechSynthesisUtterance.onerror', event);
    };

    utterance.onend = () => {
      utteranceRef.current = null; // Clear ref when speech ends
    };

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      if (utteranceRef.current) {
        utteranceRef.current = null;
      }
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h5 className="card-title">Text to Speech</h5>
        <div className="mb-3">
          <label htmlFor="textInput" className="form-label">Text to Speak:</label>
          <textarea
            className="form-control"
            id="textInput"
            rows="5"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text here to convert to speech"
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="voiceSelect" className="form-label">Voice:</label>
          <select
            className="form-select"
            id="voiceSelect"
            value={selectedVoice}
            onChange={(e) => setSelectedVoice(e.target.value)}
          >
            {voices.length > 0 ? (
              voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))
            ) : (
              <option value="">Loading voices...</option>
            )}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="pitchRange" className="form-label">Pitch: {pitch.toFixed(1)}</label>
          <input
            type="range"
            className="form-range"
            id="pitchRange"
            min="0.1"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => setPitch(parseFloat(e.target.value))}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rateRange" className="form-label">Rate: {rate.toFixed(1)}</label>
          <input
            type="range"
            className="form-range"
            id="rateRange"
            min="0.1"
            max="10"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(parseFloat(e.target.value))}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="volumeRange" className="form-label">Volume: {volume.toFixed(1)}</label>
          <input
            type="range"
            className="form-range"
            id="volumeRange"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
          />
        </div>

        <div className="d-grid gap-2 mb-3">
          <button className="btn btn-primary" onClick={speakText} disabled={!text || voices.length === 0}>Speak</button>
          <button className="btn btn-secondary" onClick={stopSpeaking}>Stop</button>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
}

export default TextToSpeech;