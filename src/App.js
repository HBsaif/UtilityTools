import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './Home';
import Calculator from './Calculator';
import Converter from './Converter';
import TodoList from './TodoList';
import Notes from './Notes';
import Weather from './Weather';
import QrCodeGenerator from './QrCodeGenerator';
import PasswordGenerator from './PasswordGenerator';
import BmiCalculator from './BmiCalculator';
import AgeCalculator from './AgeCalculator';
import TipCalculator from './TipCalculator';
import RandomNumberGenerator from './RandomNumberGenerator';
import DiceRoller from './DiceRoller';
import Stopwatch from './Stopwatch';
import CountdownTimer from './CountdownTimer';
import ColorPicker from './ColorPicker';
import UrlShortener from './UrlShortener';
import TextReverser from './TextReverser';
import WordCounter from './WordCounter';
import ImageTool from './ImageTool';
import UnitConverter from './UnitConverter';

function App() {
  const [selectedModule, setSelectedModule] = useState(null);

  const renderModule = () => {
    switch (selectedModule) {
      case 'calculator':
        return <div className="tool-container"><Calculator /></div>;
      
      case 'todo':
        return <div className="tool-container"><TodoList /></div>;
      case 'notes':
        return <div className="tool-container"><Notes /></div>;
      case 'weather':
        return <div className="tool-container"><Weather /></div>;
      case 'qrcode':
        return <div className="tool-container"><QrCodeGenerator /></div>;
      case 'password':
        return <div className="tool-container"><PasswordGenerator /></div>;
      case 'bmi':
        return <div className="tool-container"><BmiCalculator /></div>;
      case 'age':
        return <div className="tool-container"><AgeCalculator /></div>;
      case 'unitConverter':
        return <div className="tool-container"><UnitConverter /></div>;
      case 'tipCalculator':
        return <div className="tool-container"><TipCalculator /></div>;
      case 'randomNumberGenerator':
        return <div className="tool-container"><RandomNumberGenerator /></div>;
      case 'diceRoller':
        return <div className="tool-container"><DiceRoller /></div>;
      case 'stopwatch':
        return <div className="tool-container"><Stopwatch /></div>;
      case 'countdownTimer':
        return <div className="tool-container"><CountdownTimer /></div>;
      case 'colorPicker':
        return <div className="tool-container"><ColorPicker /></div>;
      case 'urlShortener':
        return <div className="tool-container"><UrlShortener /></div>;
      case 'textReverser':
        return <div className="tool-container"><TextReverser /></div>;
      case 'wordCounter':
        return <div className="tool-container"><WordCounter /></div>;
      case 'imageTool':
        return <div className="tool-container"><ImageTool /></div>;
      default:
        return <Home onSelectModule={setSelectedModule} />;
    }
  };

  return (
    <div className="container mt-5">
      {selectedModule && (
        <button className="btn back-button mb-3" onClick={() => setSelectedModule(null)}>
          <i className="fas fa-arrow-left"></i> Back to Home
        </button>
      )}
      {renderModule()}
    </div>
  );
}

export default App;