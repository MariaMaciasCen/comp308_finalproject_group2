import React, { useState } from 'react';
import { gql,useMutation } from '@apollo/client';

// Define the GraphQL mutation
const ADD_PATIENT_INFO = gql`
  mutation AddPatientInfo($pulse_rate: String, $blood_pressure: String, $weight: String,$temperature: String,$respiratory_rate: String) {
    AddPatientInfo(pulse_rate: $pulse_rate, blood_pressure: $blood_pressure, weight: $weight, temperature: $temperature, respiratory_rate: $respiratory_rate) {
      _id
      pulse_rate
      blood_pressure
      weight
      temperature
      respiratory_rate
    }
  }
`;
const PatientInfo = () => {
    const [pulse_rate, setpulse_rate] = useState('');
    const [blood_pressure, setblood_pressure] = useState('');
    const [weight, setWeight] = useState('');
    const [temperature, setTemperature] = useState('');
    const [respiratory_rate, setrespiratory_rate] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'pulse_rate':
                setpulse_rate(value);
                break;
            case 'blood_pressure':
                setblood_pressure(value);
                break;
            case 'weight':
                setWeight(value);
                break;
            case 'temperature':
                setTemperature(value);
                break;
            case 'respiratory_rate':
                setrespiratory_rate(value);
                break;
            default:
                break;
        }
    };

    // Function to clear form inputs after successful submission
    const clearForm = () => {
        setpulse_rate('');
        setblood_pressure('');
        setWeight('');
        setTemperature('');
        setrespiratory_rate('');
    };

    const[createPatientInfo] = useMutation(ADD_PATIENT_INFO);
    const handleSubmit = (e) => {
        e.preventDefault();
        // Get form data from state variables
        const formData = {
            pulse_rate,
            blood_pressure,
            weight,
            temperature,
            respiratory_rate,
        };

        console.log(pulse_rate+' '+blood_pressure+'---'+respiratory_rate)
        createPatientInfo({
            variables: { pulse_rate: pulse_rate,
                blood_pressure: blood_pressure, 
                weight: weight, 
                temperature: temperature, 
                respiratory_rate: respiratory_rate 
            },
            onCompleted(response) {
                console.log('Patient information added:', response.data);
                clearForm()
            },
            onError(data) {
                console.log("error ",data)
            },
        })
    };

    return (
        <div className="container d-flex justify-content-center p-5">
           
            <form onSubmit={handleSubmit} className="col-md-6">
                <h4 className="text-center p-3">Enter Patient Information</h4>
                <div className="mb-3">
                    <label htmlFor="pulse_rate" className="form-label">Pulse Rate:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="pulse_rate"
                        name="pulse_rate"
                        value={pulse_rate}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="blood_pressure" className="form-label">Blood Pressure:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="blood_pressure"
                        name="blood_pressure"
                        value={blood_pressure}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="weight" className="form-label">Weight:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="weight"
                        name="weight"
                        value={weight}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="temperature" className="form-label">Temperature:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="temperature"
                        name="temperature"
                        value={temperature}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="respiratory_rate" className="form-label">Respiratory Rate:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="respiratory_rate"
                        name="respiratory_rate"
                        value={respiratory_rate}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add</button>
            </form>
        </div>
    );
};

export default PatientInfo;
