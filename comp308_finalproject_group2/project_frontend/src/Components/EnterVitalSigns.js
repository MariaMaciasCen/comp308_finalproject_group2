// EnterVitalSigns.js
import React, { useState } from 'react';

const EnterVitalSigns = () => {
  // State variables to store vital sign data
  const [temperature, setTemperature] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit vital sign data to backend or perform other actions
  };

  return (
    <div>
      <h2>Enter Vital Signs</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Body Temperature:
          <input type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
        </label>
        <label>
          Heart Rate:
          <input type="text" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} />
        </label>
        <label>
          Blood Pressure:
          <input type="text" value={bloodPressure} onChange={(e) => setBloodPressure(e.target.value)} />
        </label>
        <label>
          Respiratory Rate:
          <input type="text" value={respiratoryRate} onChange={(e) => setRespiratoryRate(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EnterVitalSigns;
