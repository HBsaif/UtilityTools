import React, { useState } from 'react';

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState(null);

  const calculateAge = () => {
    if (!birthDate) return;
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let years = today.getFullYear() - birthDateObj.getFullYear();
    let months = today.getMonth() - birthDateObj.getMonth();
    let days = today.getDate() - birthDateObj.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months = (months + 12) % 12;
    }

    if (days < 0) {
      const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
      days = prevMonthLastDay - birthDateObj.getDate() + today.getDate();
      months--;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">Age Calculator</h5>
        <div className="mb-3">
          <label>Enter your date of birth</label>
          <input type="date" className="form-control" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </div>
        <button className="btn btn-custom" onClick={calculateAge}>Calculate Age</button>
        {age && (
          <div className="mt-3">
            <h4>Your age is: {age.years} years, {age.months} months, and {age.days} days</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default AgeCalculator;
