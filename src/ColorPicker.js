import React, { useState } from 'react';

function ColorPicker() {
  const [color, setColor] = useState('#000000');

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">Color Picker</h5>
        <div className="mb-3">
          <label htmlFor="colorInput" className="form-label">Select Color</label>
          <input
            type="color"
            className="form-control form-control-color"
            id="colorInput"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            title="Choose your color"
          />
        </div>
        <div className="mb-3">
          <p className="form-control">HEX: <strong>{color.toUpperCase()}</strong></p>
          <p className="form-control">RGB: <strong>{hexToRgb(color)}</strong></p>
        </div>
        <div
          style={{
            width: '100px',
            height: '100px',
            backgroundColor: color,
            border: '1px solid #ccc',
            margin: '0 auto',
            borderRadius: '5px',
          }}
        ></div>
      </div>
    </div>
  );
}

export default ColorPicker;
