import React from 'react';
import { useParams } from 'react-router-dom';

const EnterVitalSigns = () => {
  // Access the patientId parameter from the route
  const { patientId } = useParams();

  // Now you can use patientId in your component logic

  return (
    <div>
      <h1>Enter Vital Signs for Patient {patientId}</h1>
      {/* Your component JSX here */}
    </div>
  );
};

export default EnterVitalSigns;
