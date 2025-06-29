import React, { useState } from 'react';

function UnitConverterExpanded() {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');
  const [result, setResult] = useState('');

  const units = {
    temperature: {
      celsius: { toFahrenheit: (c) => (c * 9/5) + 32, toKelvin: (c) => c + 273.15, name: 'Celsius' },
      fahrenheit: { toCelsius: (f) => (f - 32) * 5/9, toKelvin: (f) => (f - 32) * 5/9 + 273.15, name: 'Fahrenheit' },
      kelvin: { toCelsius: (k) => k - 273.15, toFahrenheit: (k) => (k - 273.15) * 9/5 + 32, name: 'Kelvin' },
    },
    volume: {
      liters: { toGallons: (l) => l * 0.264172, toMilliliters: (l) => l * 1000, name: 'Liters' },
      gallons: { toLiters: (g) => g * 3.78541, toMilliliters: (g) => g * 3785.41, name: 'Gallons' },
      milliliters: { toLiters: (ml) => ml / 1000, toGallons: (ml) => ml / 3785.41, name: 'Milliliters' },
    },
    weight: {
      kilograms: { toPounds: (kg) => kg * 2.20462, toGrams: (kg) => kg * 1000, name: 'Kilograms' },
      pounds: { toKilograms: (lb) => lb * 0.453592, toGrams: (lb) => lb * 453.592, name: 'Pounds' },
      grams: { toKilograms: (g) => g / 1000, toPounds: (g) => g / 453.592, name: 'Grams' },
    },
  };

  const convert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResult('Invalid input');
      return;
    }

    let category = '';
    if (['celsius', 'fahrenheit', 'kelvin'].includes(fromUnit)) category = 'temperature';
    else if (['liters', 'gallons', 'milliliters'].includes(fromUnit)) category = 'volume';
    else if (['kilograms', 'pounds', 'grams'].includes(fromUnit)) category = 'weight';

    if (!category) {
      setResult('Please select valid units.');
      return;
    }

    const from = units[category][fromUnit];
    const to = units[category][toUnit];

    if (!from || !to) {
      setResult('Please select valid units.');
      return;
    }

    let convertedValue;
    if (fromUnit === toUnit) {
      convertedValue = numValue;
    } else if (from[`to${toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}`]) {
      convertedValue = from[`to${toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}`](numValue);
    } else if (to[`to${fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1)}`]) {
      // This case handles conversions like Fahrenheit to Celsius where Celsius has the conversion method
      convertedValue = to[`to${fromUnit.charAt(0).toUpperCase() + fromUnit.slice(1)}`](numValue);
      // Need to convert back if the 'to' unit has the conversion method from 'from' unit
      // This logic might need refinement for complex conversions, but for simple A to B, B to A it works.
      // A more robust solution would convert to a base unit first.
      // For simplicity, let's assume direct conversion methods exist or we convert to a base unit.
      // For now, I'll simplify the conversion logic to always go through a base unit if direct is not available.
      // Let's stick to direct conversion for now as per the initial structure.
      // Re-evaluating: The current structure implies direct conversion methods.
      // If fromUnit is 'celsius' and toUnit is 'fahrenheit', it calls celsius.toFahrenheit.
      // If fromUnit is 'fahrenheit' and toUnit is 'celsius', it calls fahrenheit.toCelsius.
      // This is correct.
      // The issue is if I try to convert celsius to liters, which is not supported.
      // The category check should prevent this.
      // Let's ensure the conversion function is called correctly.
      // The current structure is fine for direct conversions within a category.
      // If a direct conversion method is not found, it means it's not a direct conversion.
      // For example, if fromUnit is 'celsius' and toUnit is 'kelvin', it calls celsius.toKelvin.
      // If fromUnit is 'kelvin' and toUnit is 'celsius', it calls kelvin.toCelsius.
      // This is how it's designed.
      // The issue is when fromUnit and toUnit are from different categories.
      // The category check should handle this.
      // Let's refine the conversion logic to be more explicit.
      // For temperature, convert to Celsius first, then to target.
      // For volume, convert to Liters first, then to target.
      // For weight, convert to Kilograms first, then to target.

      let baseValue;
      if (category === 'temperature') {
        if (fromUnit === 'celsius') baseValue = numValue;
        else if (fromUnit === 'fahrenheit') baseValue = units.temperature.fahrenheit.toCelsius(numValue);
        else if (fromUnit === 'kelvin') baseValue = units.temperature.kelvin.toCelsius(numValue);

        if (toUnit === 'celsius') convertedValue = baseValue;
        else if (toUnit === 'fahrenheit') convertedValue = units.temperature.celsius.toFahrenheit(baseValue);
        else if (toUnit === 'kelvin') convertedValue = units.temperature.celsius.toKelvin(baseValue);

      } else if (category === 'volume') {
        if (fromUnit === 'liters') baseValue = numValue;
        else if (fromUnit === 'gallons') baseValue = units.volume.gallons.toLiters(numValue);
        else if (fromUnit === 'milliliters') baseValue = units.volume.milliliters.toLiters(numValue);

        if (toUnit === 'liters') convertedValue = baseValue;
        else if (toUnit === 'gallons') convertedValue = units.volume.liters.toGallons(baseValue);
        else if (toUnit === 'milliliters') convertedValue = units.volume.liters.toMilliliters(baseValue);

      } else if (category === 'weight') {
        if (fromUnit === 'kilograms') baseValue = numValue;
        else if (fromUnit === 'pounds') baseValue = units.weight.pounds.toKilograms(numValue);
        else if (fromUnit === 'grams') baseValue = units.weight.grams.toKilograms(numValue);

        if (toUnit === 'kilograms') convertedValue = baseValue;
        else if (toUnit === 'pounds') convertedValue = units.weight.kilograms.toPounds(baseValue);
        else if (toUnit === 'grams') convertedValue = units.weight.kilograms.toGrams(baseValue);
      }
    }
    setResult(convertedValue.toFixed(2));
  };

  const getUnitsForCategory = (cat) => {
    if (!cat) return [];
    return Object.keys(units[cat]).map(key => ({ value: key, label: units[cat][key].name }));
  };

  let currentCategory = '';
  if (['celsius', 'fahrenheit', 'kelvin'].includes(fromUnit)) currentCategory = 'temperature';
  else if (['liters', 'gallons', 'milliliters'].includes(fromUnit)) currentCategory = 'volume';
  else if (['kilograms', 'pounds', 'grams'].includes(fromUnit)) currentCategory = 'weight';


  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">Unit Converter</h5>
        <div className="mb-3">
          <label className="form-label">Value</label>
          <input type="number" className="form-control" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">From Unit</label>
          <select className="form-select" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            <optgroup label="Temperature">
              <option value="celsius">Celsius</option>
              <option value="fahrenheit">Fahrenheit</option>
              <option value="kelvin">Kelvin</option>
            </optgroup>
            <optgroup label="Volume">
              <option value="liters">Liters</option>
              <option value="gallons">Gallons</option>
              <option value="milliliters">Milliliters</option>
            </optgroup>
            <optgroup label="Weight">
              <option value="kilograms">Kilograms</option>
              <option value="pounds">Pounds</option>
              <option value="grams">Grams</option>
            </optgroup>
            <optgroup label="Length">
              <option value="meters">Meters</option>
              <option value="feet">Feet</option>
              <option value="inches">Inches</option>
              <option value="centimeters">Centimeters</option>
            </optgroup>
            <optgroup label="Area">
              <option value="squareMeters">Square Meters</option>
              <option value="squareFeet">Square Feet</option>
              <option value="acres">Acres</option>
            </optgroup>
            <optgroup label="Data">
              <option value="bits">Bits</option>
              <option value="bytes">Bytes</option>
              <option value="kilobits">Kilobits</option>
              <option value="kilobytes">Kilobytes</option>
              <option value="megabytes">Megabytes</option>
              <option value="gigabytes">Gigabytes</option>
              <option value="terabytes">Terabytes</option>
            </optgroup>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">To Unit</label>
          <select className="form-select" value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {getUnitsForCategory(currentCategory).map(unit => (
              <option key={unit.value} value={unit.value}>{unit.label}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-custom" onClick={convert}>Convert</button>
        {result && (
          <div className="mt-3">
            <p className="form-control">Result: {result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UnitConverterExpanded;
