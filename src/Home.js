import React, { useState } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Nav } from 'react-bootstrap';

function Home({ onSelectModule, initialActiveTab }) {
  const categories = [
    {
      name: 'Calculators & Converters',
      id: 'calculatorsConverters',
      modules: [
        { id: 'calculator', icon: 'fas fa-calculator', title: 'Calculator', description: 'A simple and easy-to-use calculator for your daily needs.' },
        { id: 'bmi', icon: 'fas fa-weight', title: 'BMI Calculator', description: 'Calculate your Body Mass Index.' },
        { id: 'age', icon: 'fas fa-birthday-cake', title: 'Age Calculator', description: 'Calculate your age from your date of birth.' },
        { id: 'tipCalculator', icon: 'fas fa-money-bill-wave', title: 'Tip Calculator', description: 'Calculate tips and split bills easily.' },
        { id: 'unitConverter', icon: 'fas fa-exchange-alt', title: 'Unit Converter', description: 'Convert between various units like temperature, volume, and weight.' },
      ]
    },
    {
      name: 'Text Tools',
      id: 'textTools',
      modules: [
        { id: 'textReverser', icon: 'fas fa-text-width', title: 'Text Reverser', description: 'Reverse the order of characters in a text.' },
        { id: 'wordCounter', icon: 'fas fa-font', title: 'Word Counter', description: 'Count words, characters, and sentences in your text.' },
        { id: 'textToSpeech', icon: 'fas fa-volume-up', title: 'Text to Speech', description: 'Convert text into spoken words.' },
      ]
    },
    {
      name: 'Fun Tools',
      id: 'funTools',
      modules: [
        { id: 'randomNumberGenerator', icon: 'fas fa-dice', title: 'Random Number Generator', description: 'Generate random numbers within a specified range.' },
        { id: 'diceRoller', icon: 'fas fa-dice-d6', title: 'Dice Roller', description: 'Simulate rolling dice with custom sides and quantity.' },
        { id: 'colorPicker', icon: 'fas fa-palette', title: 'Color Picker', description: 'Get HEX and RGB values for any color.' },
      ]
    },
    {
      name: 'Productivity Tools',
      id: 'productivityTools',
      modules: [
        { id: 'todo', icon: 'fas fa-list-check', title: 'To-Do List', description: 'Organize your tasks and stay productive.' },
        { id: 'notes', icon: 'fas fa-sticky-note', title: 'Notes', description: 'A simple notepad for your thoughts and ideas.' },
        { id: 'stopwatch', icon: 'fas fa-stopwatch', title: 'Stopwatch', description: 'A simple stopwatch to measure time.' },
        { id: 'countdownTimer', icon: 'fas fa-hourglass-half', title: 'Countdown Timer', description: 'Set a timer for your tasks and events.' },
      ]
    },
    {
      name: 'Developer Tools',
      id: 'developerTools',
      modules: [
        { id: 'qrcode', icon: 'fas fa-qrcode', title: 'QR Code Generator', description: 'Create QR codes for your links and text.' },
        { id: 'password', icon: 'fas fa-key', title: 'Password Generator', description: 'Generate strong and secure passwords.' },
        { id: 'urlShortener', icon: 'fas fa-link', title: 'URL Shortener', description: 'Shorten long URLs for easy sharing (placeholder).' },
        { id: 'imageTool', icon: 'fas fa-image', title: 'Image Tool', description: 'Resize and optimize images.' },
        { id: 'base64Converter', icon: 'fas fa-exchange-alt', title: 'Base64 Converter', description: 'Encode and decode Base64 strings.' },
        { id: 'jwtDecoder', icon: 'fas fa-lock', title: 'JWT Decoder', description: 'Decode JWT tokens to inspect their contents.' },
        { id: 'uuidGenerator', icon: 'fas fa-plus-circle', title: 'UUID Generator', description: 'Generate universally unique identifiers.' },
        { id: 'regexTester', icon: 'fas fa-file-code', title: 'Regex Tester', description: 'Test and validate regular expressions.' },
        { id: 'jsonFormatter', icon: 'fas fa-file-alt', title: 'JSON Formatter & Validator', description: 'Format and validate JSON data.' },
        { id: 'timestampConverter', icon: 'fas fa-clock', title: 'Timestamp Converter', description: 'Convert timestamps to human-readable dates and vice versa.' }
      ]
    },
    {
      name: 'Utilities',
      id: 'utilities',
      modules: [
        { id: 'weather', icon: 'fas fa-cloud-sun', title: 'Weather', description: 'Check the current weather conditions.' },
      ]
    }
  ];

  const colors = ['#a8e6cf', '#dcedc1', '#ffd3b6', '#ffaaa5', '#ff8b94', '#a2d2ff', '#bde0fe', '#ffc09f', '#ffee93'];

  const [activeTab, setActiveTab] = useState(initialActiveTab);

  return (
    <div className="home-container">
      <Tab.Container id="tool-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="tabs" className="mb-3">
          {categories.map((category) => (
            <Nav.Item key={category.id}>
              <Nav.Link eventKey={category.id}>{category.name}</Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content>
          {categories.map((category, categoryIndex) => (
            <Tab.Pane eventKey={category.id} key={category.id}>
              <div className="row">
                {category.modules.map((module, moduleIndex) => (
                  <div className="col-md-4 mb-4" key={module.id}>
                    <div
                      className="card module-card h-100"
                      style={{ backgroundColor: colors[(categoryIndex * category.modules.length + moduleIndex) % colors.length] }}
                      onClick={() => onSelectModule(module.id, activeTab)} // Pass activeTab here
                    >
                      <div className="card-body text-center">
                        <i className={`${module.icon} fa-3x mb-3`}></i>
                        <h5 className="card-title">{module.title}</h5>
                        <p className="card-text">{module.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default Home;