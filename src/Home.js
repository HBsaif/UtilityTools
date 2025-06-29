import React from 'react';
import './Home.css';

function Home({ onSelectModule }) {
  const modules = [
    { id: 'calculator', icon: 'fas fa-calculator', title: 'Calculator', description: 'A simple and easy-to-use calculator for your daily needs.' },
    { id: 'todo', icon: 'fas fa-list-check', title: 'To-Do List', description: 'Organize your tasks and stay productive.' },
    { id: 'notes', icon: 'fas fa-sticky-note', title: 'Notes', description: 'A simple notepad for your thoughts and ideas.' },
    { id: 'weather', icon: 'fas fa-cloud-sun', title: 'Weather', description: 'Check the current weather conditions.' },
    { id: 'qrcode', icon: 'fas fa-qrcode', title: 'QR Code Generator', description: 'Create QR codes for your links and text.' },
    { id: 'password', icon: 'fas fa-key', title: 'Password Generator', description: 'Generate strong and secure passwords.' },
    { id: 'bmi', icon: 'fas fa-weight', title: 'BMI Calculator', description: 'Calculate your Body Mass Index.' },
    { id: 'age', icon: 'fas fa-birthday-cake', title: 'Age Calculator', description: 'Calculate your age from your date of birth.' },
    { id: 'unitConverter', icon: 'fas fa-exchange-alt', title: 'Unit Converter', description: 'Convert between various units like temperature, volume, and weight.' },
    { id: 'tipCalculator', icon: 'fas fa-money-bill-wave', title: 'Tip Calculator', description: 'Calculate tips and split bills easily.' },
    { id: 'randomNumberGenerator', icon: 'fas fa-dice', title: 'Random Number Generator', description: 'Generate random numbers within a specified range.' },
    { id: 'diceRoller', icon: 'fas fa-dice-d6', title: 'Dice Roller', description: 'Simulate rolling dice with custom sides and quantity.' },
    { id: 'stopwatch', icon: 'fas fa-stopwatch', title: 'Stopwatch', description: 'A simple stopwatch to measure time.' },
    { id: 'countdownTimer', icon: 'fas fa-hourglass-half', title: 'Countdown Timer', description: 'Set a timer for your tasks and events.' },
    { id: 'colorPicker', icon: 'fas fa-palette', title: 'Color Picker', description: 'Get HEX and RGB values for any color.' },
    { id: 'urlShortener', icon: 'fas fa-link', title: 'URL Shortener', description: 'Shorten long URLs for easy sharing (placeholder).' },
    { id: 'textReverser', icon: 'fas fa-text-width', title: 'Text Reverser', description: 'Reverse the order of characters in a text.' },
    { id: 'wordCounter', icon: 'fas fa-font', title: 'Word Counter', description: 'Count words, characters, and sentences in your text.' },
    { id: 'imageTool', icon: 'fas fa-image', title: 'Image Tool', description: 'Resize and optimize images.' }
  ];

  const colors = ['#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5', '#ff8b94', '#a2d2ff', '#bde0fe', '#ffc09f', '#ffee93'];

  return (
    <div className="home-container">
      <div className="row">
        {modules.map((module, index) => (
          <div className="col-md-4 mb-4" key={module.id}>
            <div className="card module-card h-100" style={{ backgroundColor: colors[index % colors.length] }} onClick={() => onSelectModule(module.id)}>
              <div className="card-body text-center">
                <i className={`${module.icon} fa-3x mb-3`}></i>
                <h5 className="card-title">{module.title}</h5>
                <p className="card-text">{module.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;