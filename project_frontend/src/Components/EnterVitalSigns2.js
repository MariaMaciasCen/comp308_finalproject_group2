import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_RECORDS = gql`
  query GetUserVitalSigns($userId: String!) {
    VitalSigns(userId: $userId) {
      temperature
      heartRate
      bloodPressure
      respiratoryRate
    }
  }
`;

const UPDATE_VITAL_SIGNS = gql`
  mutation UpdateVitalSigns($userId: String!, $temperature: Float, $heartRate: Float, $bloodPressure: String, $respiratoryRate: Float) {
    UpdateVitalSigns(userId: $userId, temperature: $temperature, heartRate: $heartRate, bloodPressure: $bloodPressure, respiratoryRate: $respiratoryRate) {
      
      temperature
      heartRate
      bloodPressure
      respiratoryRate
    }
  }
`;

const EnterVitalSigns = () => {
  const { userId } = useParams();
  const [newRecord, setNewRecord] = useState({
    temperature: '',
    heartRate: '',
    bloodPressure: '',
    respiratoryRate: ''
  });

  const { loading, error, data, refetch } = useQuery(GET_RECORDS, {
    variables: { userId },
  });

  const [updateVitalSigns] = useMutation(UPDATE_VITAL_SIGNS, {
    onCompleted(data) {
      refetch(); // Refresh the data after adding the new record
      setNewRecord({ // Reset the form fields after successful addition
        temperature: '',
        heartRate: '',
        bloodPressure: '',
        respiratoryRate: ''
      });
    },
    onError(error) {
      console.error("Error updating vital signs:", error);
      // Handle error if needed
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = name === 'temperature' || name === 'heartRate' || name === 'respiratoryRate' ? parseFloat(value) : value;
    setNewRecord({ ...newRecord, [name]: numericValue });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    updateVitalSigns({
      variables: {
        userId,
        ...newRecord
      }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const vitalSigns = data?.VitalSigns || [];

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <h3>Add New Record</h3>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Temperature" 
            name="temperature" 
            value={newRecord.temperature} 
            onChange={handleInputChange} 
          />
          <br />
          <input 
            type="text" 
            placeholder="Heart Rate" 
            name="heartRate" 
            value={newRecord.heartRate} 
            onChange={handleInputChange} 
          />
          <br />
          <input 
            type="text" 
            placeholder="Blood Pressure" 
            name="bloodPressure" 
            value={newRecord.bloodPressure} 
            onChange={handleInputChange} 
          />
          <br />
          <input 
            type="text" 
            placeholder="Respiratory Rate" 
            name="respiratoryRate" 
            value={newRecord.respiratoryRate} 
            onChange={handleInputChange} 
          />
          <br />
          <button type="submit">Add Record</button>
        </form>
      </div>
      <div style={{ flex: 2 }}>
        <h2>User Vital Signs</h2>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {vitalSigns.map((sign, index) => (
            <div key={index}>
              <div>
                <p>Record {index + 1}</p>
                <p>Temperature: {sign.temperature}</p>
                <p>Heart Rate: {sign.heartRate}</p>
                <p>Blood Pressure: {sign.bloodPressure}</p>
                <p>Respiratory Rate: {sign.respiratoryRate}</p>
                <hr />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnterVitalSigns;
